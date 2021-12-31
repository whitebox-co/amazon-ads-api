import * as env from '../../../environment';
import amazonApi, { SponsoredBrandsStoresClient } from '../../../../src/index';

describe('SponsoredBrandsStoresClient', () => {
	let sponsoredBrandsStoresClient: SponsoredBrandsStoresClient;

	beforeAll(async () => {
		sponsoredBrandsStoresClient = await amazonApi.getConfiguredApi(SponsoredBrandsStoresClient, {
			clientId: env.AMAZON_ADS_CLIENT_ID,
			clientSecret: env.AMAZON_ADS_CLIENT_SECRET,
			profileId: env.AMAZON_ADS_PROFILE_ID,
			refreshToken: env.AMAZON_ADS_REFRESH_TOKEN,
		});
	});

	it('should instantiate the api', () => {
		expect(sponsoredBrandsStoresClient).toBeDefined();
	});
});
