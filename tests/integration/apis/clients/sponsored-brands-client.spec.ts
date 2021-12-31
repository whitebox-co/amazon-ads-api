import * as env from '../../../environment';
import amazonApi, { SponsoredBrandsClient } from '../../../../src/index';

describe('SponsoredBrandsClient', () => {
	let sponsoredBrandsClient: SponsoredBrandsClient;

	beforeAll(async () => {
		sponsoredBrandsClient = await amazonApi.getConfiguredApi(SponsoredBrandsClient, {
			clientId: env.AMAZON_ADS_CLIENT_ID,
			clientSecret: env.AMAZON_ADS_CLIENT_SECRET,
			profileId: env.AMAZON_ADS_PROFILE_ID,
			refreshToken: env.AMAZON_ADS_REFRESH_TOKEN,
		});
	});

	it('should instantiate the api', () => {
		expect(sponsoredBrandsClient).toBeDefined();
	});
});
