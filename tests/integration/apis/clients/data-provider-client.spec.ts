import * as env from '../../../environment';
import amazonApi, { DataProviderClient } from '../../../../src/index';

describe('DataProviderClient', () => {
	let dataProviderClient: DataProviderClient;

	beforeAll(async () => {
		dataProviderClient = await amazonApi.getConfiguredApi(DataProviderClient, {
			clientId: env.AMAZON_ADS_CLIENT_ID,
			clientSecret: env.AMAZON_ADS_CLIENT_SECRET,
			profileId: env.AMAZON_ADS_PROFILE_ID,
			refreshToken: env.AMAZON_ADS_REFRESH_TOKEN,
		});
	});

	it('should instantiate the api', () => {
		expect(dataProviderClient).toBeDefined();
	});
});
