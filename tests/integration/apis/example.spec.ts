import * as env from '../../environment';
import amazonApi, { AttributionClient } from '../../../src/index';

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
});
