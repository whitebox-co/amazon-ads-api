import globalAxios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { APIConfigurationParameters } from './constants';

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
