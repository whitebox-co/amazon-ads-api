import globalAxios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { RequestArgs } from './apis/models/base';
import { Configuration } from './apis/models/configuration';
import { APIConfigurationParameters } from './constants';
import envoyRateLimit, { RateLimitResponseCode } from './connectors/envoy-rate-limit';
import { getConfiguration, getLimiter } from './config';

/**
 * Adds functions from each individual API class into the main Client Class
 *
 * @param derivedCtor
 * @param baseCtors
 */
export const applyMixins = (derivedCtor: any, baseCtors: any[]): void => {
	for (const baseCtor of baseCtors) {
		for (const name of Object.getOwnPropertyNames(baseCtor.prototype)) {
			const baseCtorName = Object.getOwnPropertyDescriptor(baseCtor.prototype, name);
			if (baseCtorName) {
				Object.defineProperty(derivedCtor.prototype, name, baseCtorName);
			}
		}
	}
};

/**
 * Gets an instance of the global axios singleton.
 *
 * @param {APIConfigurationParameters} parameters
 * @returns {AxiosInstance}
 */
export const getAxiosInstance = (parameters: APIConfigurationParameters): AxiosInstance => {
	let axiosInstance: AxiosInstance;
	const { axios } = parameters;

	if (axios) {
		axiosInstance = axios;
	} else {
		const { accessToken, credentials } = parameters;
		axiosInstance = globalAxios.create({
			headers: {
				'Amazon-Advertising-API-ClientId': credentials?.clientId ?? '',
				'Amazon-Advertising-API-Scope': credentials?.profileId ?? '',
				Authorization: `Bearer ${accessToken ?? ''}`,
			},
		});

		axiosInstance.interceptors.response.use(
			(response: AxiosResponse) => response,
			(error: AxiosError) => {
				throw error;
			}
		);
	}
	return axiosInstance;
};

/**
 * This used to be part of the `common` OpenAPI generation. However, we needed a custom implementation
 * in order to provide rate-throttling before `axios.request()` is issued.
 *
 * This function is injected via ts-morph into each model after OpenAPI generation is complete.
 */
export const createRequestFunction = (
	axiosArgs: RequestArgs,
	globalAxios: AxiosInstance,
	BASE_PATH: string,
	configuration?: Configuration
) => {
	return async (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
		const config = getConfiguration();
		const limiter = getLimiter();
		const axiosRequestArgs = { ...axiosArgs.options, url: (configuration?.basePath || basePath) + axiosArgs.url };
		const endpoint = axiosArgs.url;
		const action = axiosRequestArgs.method;
		const isDspEndpoint = axiosArgs.url.includes('/dsp/');

		// check rate limits against an envoyproxy rate limit service to see if global rate limits are over the allowed // thresholds. - see https://github.com/envoyproxy/ratelimit#json-endpoint for descriptor format
		if (config.envoyProxyRateLimitUrl) {
			const descriptorEntries: any[] = [{ key: 'ads' }];

			if (isDspEndpoint) descriptorEntries.push({ key: 'dsp', value: action });

			const rateLimit = await envoyRateLimit.getLimit('amazon', descriptorEntries);

			if (rateLimit.overallCode === RateLimitResponseCode.OVER_LIMIT) {
				throw new Error(
					`EnvoyRateLimit: Rate Limits for amazon-ads-${endpoint}-${action} are OVER the allowed Limit`
				);
			}
		}

		// wrap the axios request in the limiter if configuration enables throttling
		const request = limiter ? limiter.wrap(axios.request) : axios.request;

		// return the rate limited or normal request.
		return request(axiosRequestArgs);
	};
};
