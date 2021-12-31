import * as env from '../../../environment';
import amazonApi, { AuthorizationManagerAccountClient } from '../../../../src/index';

describe('AuthorizationManagerAccountClient', () => {
	let authorizationManagerAccountClient: AuthorizationManagerAccountClient;

	beforeAll(async () => {
		authorizationManagerAccountClient = await amazonApi.getConfiguredApi(AuthorizationManagerAccountClient, {
			clientId: env.AMAZON_ADS_CLIENT_ID,
			clientSecret: env.AMAZON_ADS_CLIENT_SECRET,
			profileId: env.AMAZON_ADS_PROFILE_ID,
			refreshToken: env.AMAZON_ADS_REFRESH_TOKEN,
		});
	});

	it('should instantiate the api', () => {
		expect(authorizationManagerAccountClient).toBeDefined();
	});
});
