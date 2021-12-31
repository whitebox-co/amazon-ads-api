import * as env from '../../../environment';
import amazonApi, { CommonEligibilityClient } from '../../../../src/index';

describe('CommonEligibilityClient', () => {
	let commonEligibilityClient: CommonEligibilityClient;

	beforeAll(async () => {
		commonEligibilityClient = await amazonApi.getConfiguredApi(CommonEligibilityClient, {
			clientId: env.AMAZON_ADS_CLIENT_ID,
			clientSecret: env.AMAZON_ADS_CLIENT_SECRET,
			profileId: env.AMAZON_ADS_PROFILE_ID,
			refreshToken: env.AMAZON_ADS_REFRESH_TOKEN,
		});
	});

	it('should instantiate the api', () => {
		expect(commonEligibilityClient).toBeDefined();
	});
});
