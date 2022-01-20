import * as env from '../../../environment';
import amazonApi, { SponsoredBrandsExtraClient } from '../../../../src/index';

describe('SponsoredBrandsClient', () => {
	let sponsoredBrandsExtraClient: SponsoredBrandsExtraClient;

	beforeAll(async () => {
		sponsoredBrandsExtraClient = await amazonApi.getConfiguredApi(SponsoredBrandsExtraClient, {
			clientId: env.AMAZON_ADS_CLIENT_ID,
			clientSecret: env.AMAZON_ADS_CLIENT_SECRET,
			profileId: env.AMAZON_ADS_PROFILE_ID,
			refreshToken: env.AMAZON_ADS_REFRESH_TOKEN,
		});
	});

	it('should instantiate the api', () => {
		expect(sponsoredBrandsExtraClient).toBeDefined();
	});
});
