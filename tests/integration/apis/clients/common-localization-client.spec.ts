import * as env from '../../../environment';
import amazonApi, { CommonLocalizationClient } from '../../../../src/index';

describe('CommonLocalizationClient', () => {
	let commonLocalizationClient: CommonLocalizationClient;

	beforeAll(async () => {
		commonLocalizationClient = await amazonApi.getConfiguredApi(CommonLocalizationClient, {
			clientId: env.AMAZON_ADS_CLIENT_ID,
			clientSecret: env.AMAZON_ADS_CLIENT_SECRET,
			profileId: env.AMAZON_ADS_PROFILE_ID,
			refreshToken: env.AMAZON_ADS_REFRESH_TOKEN,
		});
	});

	it('should instantiate the api', () => {
		expect(commonLocalizationClient).toBeDefined();
	});
});
