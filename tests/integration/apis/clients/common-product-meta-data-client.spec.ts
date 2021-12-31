import * as env from '../../../environment';
import amazonApi, { CommonProductMetaDataClient } from '../../../../src/index';

describe('CommonProductMetaDataClient', () => {
	let commonProductMetaDataClient: CommonProductMetaDataClient;

	beforeAll(async () => {
		commonProductMetaDataClient = await amazonApi.getConfiguredApi(CommonProductMetaDataClient, {
			clientId: env.AMAZON_ADS_CLIENT_ID,
			clientSecret: env.AMAZON_ADS_CLIENT_SECRET,
			profileId: env.AMAZON_ADS_PROFILE_ID,
			refreshToken: env.AMAZON_ADS_REFRESH_TOKEN,
		});
	});

	it('should instantiate the api', () => {
		expect(commonProductMetaDataClient).toBeDefined();
	});
});
