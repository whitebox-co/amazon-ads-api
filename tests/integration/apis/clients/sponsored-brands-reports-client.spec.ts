import * as env from '../../../environment';
import amazonApi, { SponsoredBrandsReportsClient } from '../../../../src/index';

describe('SponsoredBrandsReportsClient', () => {
	let sponsoredBrandsReportsClient: SponsoredBrandsReportsClient;

	beforeAll(async () => {
		sponsoredBrandsReportsClient = await amazonApi.getConfiguredApi(SponsoredBrandsReportsClient, {
			clientId: env.AMAZON_ADS_CLIENT_ID,
			clientSecret: env.AMAZON_ADS_CLIENT_SECRET,
			profileId: env.AMAZON_ADS_PROFILE_ID,
			refreshToken: env.AMAZON_ADS_REFRESH_TOKEN,
		});
	});

	it('should instantiate the api', () => {
		expect(sponsoredBrandsReportsClient).toBeDefined();
	});
});
