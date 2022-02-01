import axios from 'axios';
import { AmazonAdsApiConfiguration } from './config';
import { setConfiguration } from './config';

import {
	AmazonAdsApi,
	AmazonAdvertisingAPICredentials,
	AMAZON_API_PREFIX,
	APIConfigurationParameters,
} from './constants';

interface CredentialsCache {
	[key: string]: AmazonAdvertisingAPICredentials;
}

const credentialsCache: CredentialsCache = {};

/**
 * Uses the clientId, clientSecret, and existing refreshToken to retrieve a new accessToken.
 * This is necessary to call when the accessToken expires.
 */
const requestNewAccessToken = async (credentials: AmazonAdvertisingAPICredentials) => {
	const params = new URLSearchParams();
	params.append('grant_type', 'refresh_token');
	params.append('refresh_token', credentials.refreshToken);
	params.append('client_id', credentials.clientId);
	params.append('client_secret', credentials.clientSecret);

	const config = {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	};

	const response = await axios.post(`${AMAZON_API_PREFIX}/auth/o2/token`, params, config);

	if (response.status !== 200) {
		throw new Error(`Amazon Ads API Authorization failed for clientId ${credentials.clientId}`);
	}

	const expirationDate = new Date();
	expirationDate.setSeconds(expirationDate.getSeconds() + 3600);

	return {
		...credentials,
		accessToken: response.data.access_token,
		refreshToken: response.data.refresh_token,
		expiresOn: expirationDate,
	};
};

/**
 * Checks for cached credentials based and requests a new one ifs expiration has elapsed
 *
 * @param {AmazonAdvertisingAPICredentials} credentials credentials without authorized token.
 * @returns {Promise<AmazonAdvertisingAPICredentials>} cached or new credentials.
 */
const authorize = async (credentials: AmazonAdvertisingAPICredentials): Promise<AmazonAdvertisingAPICredentials> => {
	const { clientId } = credentials;

	// lets first check if credentials are cached and make sure the expiration has not been hit.
	let cachedCredentials: AmazonAdvertisingAPICredentials = credentialsCache[clientId];
	const isCached =
		cachedCredentials &&
		cachedCredentials.accessToken &&
		cachedCredentials.refreshToken &&
		cachedCredentials.expiresOn &&
		new Date() < cachedCredentials.expiresOn;

	// get new token if cached credentials were invalid or walmart tell us it's not valid.
	if (!isCached) {
		cachedCredentials = await requestNewAccessToken(credentials);
	}

	// cache credentials.
	credentialsCache[clientId] = cachedCredentials;

	// return cached or new credentials
	return cachedCredentials;
};

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
	constructor(public credentials: AmazonAdvertisingAPICredentials, public configuration?: AmazonAdsApiConfiguration) {
		setConfiguration(configuration);
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

export default {
	getConfiguredApi,
};
