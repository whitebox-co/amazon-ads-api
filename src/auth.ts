import axios from 'axios';

import { AmazonAdvertisingAPICredentials, AMAZON_API_PREFIX } from './constants';

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
export const authorize = async (
	credentials: AmazonAdvertisingAPICredentials
): Promise<AmazonAdvertisingAPICredentials> => {
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
