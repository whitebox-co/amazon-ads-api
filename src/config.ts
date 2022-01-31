import Bottleneck from 'bottleneck';

export interface AmazonAdsApiConfiguration {
	throttling?: Bottleneck.ConstructorOptions;
	retries?: {
		count: number;
		refreshTime: number;
		maxWaitTime: number;
		retryCallback?: any;
	};
	envoyProxyRateLimitUrl?: string;
}

let configuration: AmazonAdsApiConfiguration = {};
let adsLimiter: Bottleneck;

// retry on failures (up to configuration retry count)
const retryCallbackListener = (error, jobInfo) => {
	if (jobInfo.retryCount < configuration.retries?.count) {
		if (configuration.retries.retryCallback) configuration.retries.retryCallback(jobInfo);
		return configuration.retries.refreshTime || 100;
	}
};

/**
 * Sets the global configuration
 *
 * @param {AmazonAdsApiConfiguration} config The user config
 */
const setConfiguration = (config: AmazonAdsApiConfiguration): void => {
	if (config.throttling && !adsLimiter) {
		adsLimiter = new Bottleneck(config.throttling);
		adsLimiter.on('failed', retryCallbackListener);
	} else if (config.throttling && adsLimiter) {
		adsLimiter.updateSettings(config);
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
