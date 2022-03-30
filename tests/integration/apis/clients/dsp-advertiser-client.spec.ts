import * as env from '../../../environment';
import amazonApi, { DspAdvertiserClient } from '../../../../src/index';

describe('DspAdvertiserClient', () => {
	let dspAdvertiserClient: DspAdvertiserClient;

	beforeAll(async () => {
		dspAdvertiserClient = await amazonApi.getConfiguredApi(DspAdvertiserClient, {
			clientId: env.AMAZON_ADS_CLIENT_ID,
			clientSecret: env.AMAZON_ADS_CLIENT_SECRET,
			profileId: env.AMAZON_ADS_PROFILE_ID,
			refreshToken: env.AMAZON_ADS_REFRESH_TOKEN,
		});
	});

	it('should instantiate the api', () => {
		expect(dspAdvertiserClient).toBeDefined();
	});

	it('should get a listing of advertisers', async () => {
		const response = await dspAdvertiserClient.dspAdvertisersGet({
			amazonAdvertisingAPIClientId: env.AMAZON_ADS_CLIENT_ID,
			amazonAdvertisingAPIScope: env.AMAZON_ADS_PROFILE_ID,
		});
		expect(response.data).toEqual({});
	});
});
