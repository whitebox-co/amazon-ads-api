import * as env from '../../../environment';
import amazonApi, { SponsoredDisplayExtraClient } from '../../../../src/index';

describe('SponsoredDisplayExtraClient', () => {
	let sponsoredDisplayExtraClient: SponsoredDisplayExtraClient;

	beforeAll(async () => {
		sponsoredDisplayExtraClient = await amazonApi.getConfiguredApi(SponsoredDisplayExtraClient, {
			clientId: env.AMAZON_ADS_CLIENT_ID,
			clientSecret: env.AMAZON_ADS_CLIENT_SECRET,
			profileId: env.AMAZON_ADS_PROFILE_ID,
			refreshToken: env.AMAZON_ADS_REFRESH_TOKEN,
		});
	});

	it('should instantiate the api', () => {
		expect(sponsoredDisplayExtraClient).toBeDefined();
	});
});
