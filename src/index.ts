import Bottleneck from 'bottleneck';
import { authorize } from './auth';
import { AmazonAdsApiConfiguration } from './config';
import { setConfiguration } from './config';

import { AmazonAdsApi, AmazonAdvertisingAPICredentials, APIConfigurationParameters } from './constants';

/**
 * Authorizes against the Amazon token endpoint and returns a configured APIConfigurationParameters object
 * that contains the authorized refresh token necessary to make subsequent API calls.
 *
 * This is the main object passed in to all api's and must have a valid refresh token.
 *
 * @param {AmazonAdvertisingAPICredentials} credentials input params, some are optional.
 * @returns {Promise<APIConfigurationParameters>} A APIConfigurationParameters object with an authorized and valid * refreshToken.
 */
const getAuthorizedConfiguration = async (
	credentials: AmazonAdvertisingAPICredentials
): Promise<APIConfigurationParameters> => {
	const authorizedCredentials = await authorize(credentials);

	return {
		accessToken: authorizedCredentials.accessToken,
		credentials: authorizedCredentials,
	};
};

/**
 * Generates a fully instantiated and configured Amazon Ads Client. Each `Client` is specific
 * to an individual part of the ads api. Each of these directly map to Amazon's OpenAPI for
 * each area of concern.
 *
 * @param {T} Client Amazon Ads Client Class.
 * - Should be one of the many Clients from the './api/clients' exports.
 * - This should be the Class itself and not an instance.
 *
 * @param {AmazonAdvertisingAPICredentials} credentials input params, some are optional.
 *
 * @returns {Promise<T>} A fully instantiated Api from the './api' exports.
 */
const getConfiguredApi = async <T extends AmazonAdsApi>(
	Client: new (config: APIConfigurationParameters) => T,
	credentials: AmazonAdvertisingAPICredentials
): Promise<T> => {
	const authorizedConfiguration = await getAuthorizedConfiguration(credentials);
	return new Client(authorizedConfiguration);
};

/**
 * Class based AmazonAds implementation
 */
export class AmazonAds {
	constructor(
		public credentials: AmazonAdvertisingAPICredentials,
		public configuration?: AmazonAdsApiConfiguration,
		limiter?: Bottleneck
	) {
		setConfiguration(configuration, limiter);
	}

	/**
	 * Generates a fully instantiated and configured Amazon Ads Client. Each `Client` is specific
	 * to an individual part of the ads api. Each of these directly map to Amazon's OpenAPI for
	 * each area of concern.
	 *
	 * @param {T} Client Amazon Ads Client Class.
	 * - Should be one of the many Clients from the './api/clients' exports.
	 * - This should be the Class itself and not an instance.
	 *
	 * @param {AmazonAdvertisingAPICredentials} credentials input params, some are optional.
	 *
	 * @returns {Promise<T>} A fully instantiated Api from the './api' exports.
	 */
	getConfiguredApi = async <T extends AmazonAdsApi>(
		Api: new (config: APIConfigurationParameters) => T
	): Promise<T> => {
		return await getConfiguredApi(Api, this.credentials);
	};
}

export * from './config';
export * from './constants';
export * from './apis/clients';
export * from './helpers';

export default {
	getConfiguredApi,
};
