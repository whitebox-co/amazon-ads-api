import * as env from '../../../environment';
import amazonApi, { SponsoredDisplayClient } from '../../../../src/index';

describe('SponsoredDisplayClient', () => {
	let sponsoredDisplayClient: SponsoredDisplayClient;

	beforeAll(async () => {
		sponsoredDisplayClient = await amazonApi.getConfiguredApi(SponsoredDisplayClient, {
			clientId: env.AMAZON_ADS_CLIENT_ID,
			clientSecret: env.AMAZON_ADS_CLIENT_SECRET,
			profileId: env.AMAZON_ADS_PROFILE_ID,
			refreshToken: env.AMAZON_ADS_REFRESH_TOKEN,
		});
	});

	it('should instantiate the api', () => {
		expect(sponsoredDisplayClient).toBeDefined();
	});
});
