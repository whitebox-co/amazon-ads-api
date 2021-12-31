import * as env from '../../../environment';
import amazonApi, { SponsoredBrandsCategoryBenchmarkClient } from '../../../../src/index';

describe('SponsoredBrandsCategoryBenchmarkClient', () => {
	let sponsoredBrandsCategoryBenchmarkClient: SponsoredBrandsCategoryBenchmarkClient;

	beforeAll(async () => {
		sponsoredBrandsCategoryBenchmarkClient = await amazonApi.getConfiguredApi(
			SponsoredBrandsCategoryBenchmarkClient,
			{
				clientId: env.AMAZON_ADS_CLIENT_ID,
				clientSecret: env.AMAZON_ADS_CLIENT_SECRET,
				profileId: env.AMAZON_ADS_PROFILE_ID,
				refreshToken: env.AMAZON_ADS_REFRESH_TOKEN,
			}
		);
	});

	it('should instantiate the api', () => {
		expect(sponsoredBrandsCategoryBenchmarkClient).toBeDefined();
	});
});
