import { AdvertisersApi } from '../../../src/apis/models/attribution';
import { AttributionClient } from '../../../src/apis/clients/attribution-client';
import { getAxiosInstance, applyMixins } from '../../../src/helpers';
import { APIConfigurationParameters } from '../../../src/constants';

import globalAxios from 'axios';

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
		it('should return existing axios instance if one isn provided', () => {
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
});
