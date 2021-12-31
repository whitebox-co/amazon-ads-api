import * as env from '../../../environment';
import amazonApi, { CommonBillingClient } from '../../../../src/index';

describe('CommonBillingClient', () => {
	let commonBillingClient: CommonBillingClient;

	beforeAll(async () => {
		commonBillingClient = await amazonApi.getConfiguredApi(CommonBillingClient, {
			clientId: env.AMAZON_ADS_CLIENT_ID,
			clientSecret: env.AMAZON_ADS_CLIENT_SECRET,
			profileId: env.AMAZON_ADS_PROFILE_ID,
			refreshToken: env.AMAZON_ADS_REFRESH_TOKEN,
		});
	});

	it('should instantiate the api', () => {
		expect(commonBillingClient).toBeDefined();
	});
});
