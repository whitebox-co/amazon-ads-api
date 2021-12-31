import * as env from '../../../environment';
import amazonApi, { AttributionClient } from '../../../../src/index';

describe('AttributionClient', () => {
	let attributionClient: AttributionClient;

	beforeAll(async () => {
		attributionClient = await amazonApi.getConfiguredApi(AttributionClient, {
			clientId: env.AMAZON_ADS_CLIENT_ID,
			clientSecret: env.AMAZON_ADS_CLIENT_SECRET,
			profileId: env.AMAZON_ADS_PROFILE_ID,
			refreshToken: env.AMAZON_ADS_REFRESH_TOKEN,
		});
	});

	it('should instantiate the api', () => {
		expect(attributionClient).toBeDefined();
	});
});
