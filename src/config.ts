import Bottleneck from 'bottleneck';
import { authorize } from './auth';

export interface AmazonAdsApiConfiguration {
	throttling?: Bottleneck.ConstructorOptions;
	retries?: {
		count: number;
		refreshTime: number;
		maxWaitTime: number;
		retryCallback?: any;
	};
	envoyProxyRateLimitUrl?: string;
	jobOptions?: {
		expiration: number;
	};
}

let configuration: AmazonAdsApiConfiguration = {};
let adsLimiter: Bottleneck;

// retry on failures (up to configuration retry count)
const retryCallbackListener = async (error, jobInfo) => {
	// handle configurable retries.
	if (jobInfo.retryCount < configuration.retries?.count) {
		const credentials = jobInfo.args[0].credentials || jobInfo.args[0];
		// let's handle the case where the bottleneck has executed after the access token has expired.
		// which is possible when the job expiration is higher than the 1hr token expiration
		try {
			if (error.isAxiosError && error.response?.status === 401) await authorize(credentials);
		} catch (secondaryError) {
			// if we get another 401 after refreshing the token, we should gracefully fail without another retry
			if (secondaryError.isAxiosError && secondaryError.response?.status === 401) {
				throw { status: 401, message: `Exhausted retries for ${credentials.clientId}` };
			}
		}

		// call user supplied callback
		if (configuration.retries.retryCallback) configuration.retries.retryCallback(error, jobInfo);

		// the amount of time for the next retry
		return configuration.retries.refreshTime || 100;
	}
};

/**
 * Sets the global configuration
 *
 * @param {AmazonAdsApiConfiguration} config The user config
 */
const setConfiguration = (config: AmazonAdsApiConfiguration, limiter?: Bottleneck): void => {
	if (configuration !== config && !limiter) {
		if (config.throttling && !adsLimiter) {
			adsLimiter = new Bottleneck(config.throttling);
			adsLimiter.on('failed', retryCallbackListener);
		} else if (config.throttling && adsLimiter) {
			adsLimiter.updateSettings(config);
		}
	} else if (limiter) {
		adsLimiter = limiter;
	}
	configuration = config;
};

/**
 * Gets the global configuration
 *
 * @returns {AmazonAdsApiConfiguration} the api configuration
 */
const getConfiguration = (): AmazonAdsApiConfiguration => {
	return configuration;
};

const getLimiter = () => {
	return adsLimiter;
};

export { setConfiguration, getConfiguration, getLimiter };
