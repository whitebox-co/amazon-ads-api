import * as env from '../../../environment';
import amazonApi, { CommonInsightsClient } from '../../../../src/index';

describe('CommonInsightsClient', () => {
	let commonInsightsClient: CommonInsightsClient;

	beforeAll(async () => {
		commonInsightsClient = await amazonApi.getConfiguredApi(CommonInsightsClient, {
			clientId: env.AMAZON_ADS_CLIENT_ID,
			clientSecret: env.AMAZON_ADS_CLIENT_SECRET,
			profileId: env.AMAZON_ADS_PROFILE_ID,
			refreshToken: env.AMAZON_ADS_REFRESH_TOKEN,
		});
	});

	it('should instantiate the api', () => {
		expect(commonInsightsClient).toBeDefined();
	});
});
