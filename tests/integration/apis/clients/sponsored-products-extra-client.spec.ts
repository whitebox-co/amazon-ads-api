import * as env from '../../../environment';
import amazonApi, { SponsoredProductsExtraClient } from '../../../../src/index';

describe('SponsoredProductsExtraClient', () => {
	let sponsoredProductsExtraClient: SponsoredProductsExtraClient;

	beforeAll(async () => {
		sponsoredProductsExtraClient = await amazonApi.getConfiguredApi(SponsoredProductsExtraClient, {
			clientId: env.AMAZON_ADS_CLIENT_ID,
			clientSecret: env.AMAZON_ADS_CLIENT_SECRET,
			profileId: env.AMAZON_ADS_PROFILE_ID,
			refreshToken: env.AMAZON_ADS_REFRESH_TOKEN,
		});
	});

	it('should instantiate the api', () => {
		expect(sponsoredProductsExtraClient).toBeDefined();
	});
});
