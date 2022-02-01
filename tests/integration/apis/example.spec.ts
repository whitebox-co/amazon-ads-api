import * as env from '../../environment';
import amazonApi, { AttributionClient, setConfiguration } from '../../../src/index';

describe(`${AttributionClient.name}`, () => {
	let attributionClient: AttributionClient;

	beforeAll(async () => {
		attributionClient = await amazonApi.getConfiguredApi(AttributionClient, {
			clientId: env.AMAZON_ADS_CLIENT_ID,
			clientSecret: env.AMAZON_ADS_CLIENT_SECRET,
			profileId: env.AMAZON_ADS_PROFILE_ID,
			refreshToken: env.AMAZON_ADS_REFRESH_TOKEN,
		});
	});

	describe('#getAdvertisersByProfile', () => {
		it('should return a list of advertisers associated with an Amazon Attribution account.', async () => {
			const advertisers = await attributionClient.getAdvertisersByProfile({
				amazonAdvertisingAPIClientId: env.AMAZON_ADS_CLIENT_ID,
				amazonAdvertisingAPIScope: env.AMAZON_ADS_PROFILE_ID,
			});

			expect(advertisers).toBeDefined();
			expect(advertisers.data).toBeDefined();
			expect(advertisers.data).toBeDefined();
			expect(advertisers.data.advertisers).toBeDefined();
		});
	});

	/** These tests will require proper setup and configuration of a local instance of envoy rate limit proxy */
	describe('Envoy Proxy Rate Limits', () => {
		it('should rate limit based on a simple test of no more than 1 per minute', async () => {
			const configuration = {
				envoyProxyRateLimitUrl: 'http://localhost:8080',
			};

			setConfiguration(configuration);

			await expect(async () => {
				await attributionClient.getAdvertisersByProfile({
					amazonAdvertisingAPIClientId: env.AMAZON_ADS_CLIENT_ID,
					amazonAdvertisingAPIScope: env.AMAZON_ADS_PROFILE_ID,
				});
			}).rejects.toThrow(
				'EnvoyRateLimit: Rate Limits for amazon-ads-/attribution/advertisers-GET are OVER the allowed Limit'
			);
		});
	});

	describe('Bottleneck Rate Throttling', () => {
		it('should throttle based on a simple test of no more than 1 per minute', async () => {
			const startTime = Date.now();
			const configuration = {
				throttling: {
					maxConcurrent: 1,
					minTime: 2000,
				},
			};

			setConfiguration(configuration);

			await attributionClient.getAdvertisersByProfile({
				amazonAdvertisingAPIClientId: env.AMAZON_ADS_CLIENT_ID,
				amazonAdvertisingAPIScope: env.AMAZON_ADS_PROFILE_ID,
			});

			await attributionClient.getAdvertisersByProfile({
				amazonAdvertisingAPIClientId: env.AMAZON_ADS_CLIENT_ID,
				amazonAdvertisingAPIScope: env.AMAZON_ADS_PROFILE_ID,
			});

			await attributionClient.getAdvertisersByProfile({
				amazonAdvertisingAPIClientId: env.AMAZON_ADS_CLIENT_ID,
				amazonAdvertisingAPIScope: env.AMAZON_ADS_PROFILE_ID,
			});

			const endTime = Date.now();
			const elapsedTime = (endTime - startTime) / 1000; // in seconds

			expect(elapsedTime).toBeGreaterThan(4);
		});

		it('should retry up to n times (based on configuration)', async () => {
			let retryCount = 0;
			const retryCallback = (job: any) => {
				retryCount = job.retryCount;
			};

			const configuration = {
				throttling: {
					maxConcurrent: 1,
					minTime: 100,
				},
				retries: {
					count: 3,
					refreshTime: 2000,
					maxWaitTime: 2000,
					retryCallback,
				},
			};

			setConfiguration(configuration);

			try {
				await attributionClient.getAdvertisersByProfile({
					amazonAdvertisingAPIClientId: '',
					amazonAdvertisingAPIScope: env.AMAZON_ADS_PROFILE_ID,
				});
			} catch (err) {
				return;
			}

			expect(retryCount).toEqual(3);
		}, 10000);
	});
});
