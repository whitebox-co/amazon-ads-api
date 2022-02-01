/* eslint-disable @typescript-eslint/ban-ts-comment */

import { AdvertisersApi } from '../../../src/apis/models/attribution';
import { AttributionClient } from '../../../src/apis/clients/attribution-client';
import { getAxiosInstance, applyMixins, createRequestFunction } from '../../../src/helpers';
import { APIConfigurationParameters } from '../../../src/constants';

import globalAxios from 'axios';
import { BASE_PATH } from '../../../src/apis/models/base';
import { setConfiguration } from '../../../src/config';
import envoyRateLimit from '../../../src/connectors/envoy-rate-limit';

jest.mock('../../../src/connectors/envoy-rate-limit');

jest.mock('../../../src/config.ts', () => ({
	/* @ts-ignore */
	...jest.requireActual('../../../src/config.ts'),
	getLimiter: jest.fn().mockImplementation(() => {
		return {
			wrap: jest.fn().mockImplementation(() => {
				return jest.fn;
			}),
		};
	}),
}));

describe('helpers', () => {
	describe('applyMixins', () => {
		it('should dynamically add model properties to the client', () => {
			const expectedModelProperties = Object.getOwnPropertyNames(AdvertisersApi.prototype);

			applyMixins(AttributionClient, [AdvertisersApi]);

			expect(AttributionClient).toBeDefined();
			expect(AttributionClient.prototype).toBeDefined();

			const clientProperties = Object.getOwnPropertyNames(AttributionClient.prototype);

			// check if all model properties have been added to the client.
			expect(clientProperties).toEqual(expect.arrayContaining(expectedModelProperties));
		});
	});

	describe('getAxiosInstance', () => {
		it('should return existing axios instance if one is provided', () => {
			const existingAxiosInstance = globalAxios.create();

			const apiConfig: APIConfigurationParameters = {
				axios: existingAxiosInstance,
				accessToken: '',
				basePath: '',
				baseOptions: {},
				credentials: {
					clientId: '',
					clientSecret: '',
					profileId: '',
				},
			};

			const axiosInstance = getAxiosInstance(apiConfig);

			expect(existingAxiosInstance).toEqual(axiosInstance);
		});

		it('should return an new axios instance if one is not provided', () => {
			const existingAxiosInstance = globalAxios.create();

			const apiConfig: APIConfigurationParameters = {
				accessToken: '',
				basePath: '',
				baseOptions: {},
				credentials: {
					clientId: '',
					clientSecret: '',
					profileId: '',
				},
			};

			const axiosInstance = getAxiosInstance(apiConfig);

			expect(existingAxiosInstance).not.toEqual(axiosInstance);
		});
	});

	describe('createRequestFunction', () => {
		const existingAxiosInstance = globalAxios.create();

		const apiConfig: APIConfigurationParameters = {
			axios: existingAxiosInstance,
			accessToken: '',
			basePath: '',
			baseOptions: {},
			credentials: {
				clientId: '',
				clientSecret: '',
				profileId: '',
			},
		};

		const axiosInstance = getAxiosInstance(apiConfig);

		const requestArgs = {
			url: '/dsp/reports',
			options: { method: 'get' },
		};

		beforeEach(() => {
			jest.spyOn<any, any>(envoyRateLimit, 'getLimit').mockResolvedValue({ overallCode: 'OK' });
		});

		it('should implement envoyproxy/ratelimit based on configuration', async () => {
			const configuration = {
				throttling: {
					reservoir: 100,
					reservoirRefreshAmount: 100,
					reservoirRefreshInterval: 60 * 1000,
					maxConcurrent: 5,
					minTime: 333,
				},
				retries: {
					count: 3,
					refreshTime: 5000,
					maxWaitTime: 5000,
					retryCallback: (/* job: string */) => {
						// console.log(`Retrying job ${job.id}`);
						return;
					},
				},
				envoyProxyRateLimitUrl: 'http://localhost:8080',
			};

			setConfiguration(configuration);

			await createRequestFunction(requestArgs, axiosInstance, BASE_PATH)();

			expect(envoyRateLimit.getLimit).toHaveBeenCalledWith('amazon', [
				{ key: 'ads' },
				{ key: 'dsp', value: 'get' },
			]);
		});

		it('should throw rate limit error if envoy rate limit enabled and rate limit is OVER_LIMIT', async () => {
			const configuration = {
				throttling: {
					reservoir: 100,
					reservoirRefreshAmount: 100,
					reservoirRefreshInterval: 60 * 1000,
					maxConcurrent: 5,
					minTime: 333,
				},
				retries: {
					count: 3,
					refreshTime: 5000,
					maxWaitTime: 5000,
					retryCallback: (/* jobId: string */) => {
						// console.log(`Retrying job ${jobId}`);
						return;
					},
				},
				envoyProxyRateLimitUrl: 'http://localhost:8080',
			};

			setConfiguration(configuration);

			jest.spyOn<any, any>(envoyRateLimit, 'getLimit').mockResolvedValueOnce({ overallCode: 'OVER_LIMIT' });

			await expect(async () => {
				await createRequestFunction(requestArgs, axiosInstance, BASE_PATH)();
			}).rejects.toThrow(
				'EnvoyRateLimit: Rate Limits for amazon-ads-/dsp/reports-get are OVER the allowed Limit'
			);
		});

		it('should not call envoy proxy rate limit if configuration is not present', async () => {
			setConfiguration({});

			await createRequestFunction(requestArgs, axiosInstance, BASE_PATH)();

			expect(envoyRateLimit.getLimit).toBeCalledTimes(0);
		});
	});
});
