import Bottleneck from 'bottleneck';

export interface AmazonAdsApiConfiguration {
	throttling?: {
		ads: Bottleneck.ConstructorOptions;
		dsp: {
			get: Bottleneck.ConstructorOptions;
			post: Bottleneck.ConstructorOptions;
			put: Bottleneck.ConstructorOptions;
		};
	};
	retries?: {
		count: number;
		refreshTime: number;
		maxWaitTime: number;
		retryCallback?: Record<string, unknown>;
	};
	envoyProxyRateLimitUrl?: string;
}

let configuration: AmazonAdsApiConfiguration = {};

/**
 * Sets the global configuration
 *
 * @param {AmazonAdsApiConfiguration} config The user config
 */
const setConfiguration = (config: AmazonAdsApiConfiguration) => {
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

export { setConfiguration, getConfiguration };
