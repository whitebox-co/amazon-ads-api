import * as env from '../../../environment';
import amazonApi, { CommonCreativeAssetsClient } from '../../../../src/index';

describe('CommonCreativeAssetsClient', () => {
	let commonCreativeAssetsClient: CommonCreativeAssetsClient;

	beforeAll(async () => {
		commonCreativeAssetsClient = await amazonApi.getConfiguredApi(CommonCreativeAssetsClient, {
			clientId: env.AMAZON_ADS_CLIENT_ID,
			clientSecret: env.AMAZON_ADS_CLIENT_SECRET,
			profileId: env.AMAZON_ADS_PROFILE_ID,
			refreshToken: env.AMAZON_ADS_REFRESH_TOKEN,
		});
	});

	it('should instantiate the api', () => {
		expect(commonCreativeAssetsClient).toBeDefined();
	});
});
