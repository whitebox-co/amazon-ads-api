import * as env from '../../../environment';
import amazonApi, { AuthorizationProfilesClient } from '../../../../src/index';

describe('AuthorizationProfilesClient', () => {
	let authorizationProfilesClient: AuthorizationProfilesClient;

	beforeAll(async () => {
		authorizationProfilesClient = await amazonApi.getConfiguredApi(AuthorizationProfilesClient, {
			clientId: env.AMAZON_ADS_CLIENT_ID,
			clientSecret: env.AMAZON_ADS_CLIENT_SECRET,
			profileId: env.AMAZON_ADS_PROFILE_ID,
			refreshToken: env.AMAZON_ADS_REFRESH_TOKEN,
		});
	});

	it('should instantiate the api', () => {
		expect(authorizationProfilesClient).toBeDefined();
	});
});
