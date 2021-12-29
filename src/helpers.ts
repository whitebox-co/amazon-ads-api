import globalAxios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { APIConfigurationParameters } from './constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
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
