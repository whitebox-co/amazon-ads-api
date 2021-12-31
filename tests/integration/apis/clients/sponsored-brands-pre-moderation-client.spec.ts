import * as env from '../../../environment';
import amazonApi, { SponsoredBrandsPreModerationClient } from '../../../../src/index';

describe('SponsoredBrandsPreModerationClient', () => {
	let sponsoredBrandsPreModerationClient: SponsoredBrandsPreModerationClient;

	beforeAll(async () => {
		sponsoredBrandsPreModerationClient = await amazonApi.getConfiguredApi(SponsoredBrandsPreModerationClient, {
			clientId: env.AMAZON_ADS_CLIENT_ID,
			clientSecret: env.AMAZON_ADS_CLIENT_SECRET,
			profileId: env.AMAZON_ADS_PROFILE_ID,
			refreshToken: env.AMAZON_ADS_REFRESH_TOKEN,
		});
	});

	it('should instantiate the api', () => {
		expect(sponsoredBrandsPreModerationClient).toBeDefined();
	});
});
