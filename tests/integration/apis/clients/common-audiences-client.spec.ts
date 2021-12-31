import * as env from '../../../environment';
import amazonApi, { CommonAudiencesClient } from '../../../../src/index';

describe('CommonAudiencesClient', () => {
	let commonAudiencesClient: CommonAudiencesClient;

	beforeAll(async () => {
		commonAudiencesClient = await amazonApi.getConfiguredApi(CommonAudiencesClient, {
			clientId: env.AMAZON_ADS_CLIENT_ID,
			clientSecret: env.AMAZON_ADS_CLIENT_SECRET,
			profileId: env.AMAZON_ADS_PROFILE_ID,
			refreshToken: env.AMAZON_ADS_REFRESH_TOKEN,
		});
	});

	it('should instantiate the api', () => {
		expect(commonAudiencesClient).toBeDefined();
	});
});
