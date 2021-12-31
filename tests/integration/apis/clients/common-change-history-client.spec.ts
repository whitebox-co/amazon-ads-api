import * as env from '../../../environment';
import amazonApi, { CommonChangeHistoryClient } from '../../../../src/index';

describe('CommonChangeHistoryClient', () => {
	let commonChangeHistoryClient: CommonChangeHistoryClient;

	beforeAll(async () => {
		commonChangeHistoryClient = await amazonApi.getConfiguredApi(CommonChangeHistoryClient, {
			clientId: env.AMAZON_ADS_CLIENT_ID,
			clientSecret: env.AMAZON_ADS_CLIENT_SECRET,
			profileId: env.AMAZON_ADS_PROFILE_ID,
			refreshToken: env.AMAZON_ADS_REFRESH_TOKEN,
		});
	});

	it('should instantiate the api', () => {
		expect(commonChangeHistoryClient).toBeDefined();
	});
});
