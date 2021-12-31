import * as env from '../../../environment';
import amazonApi, { DspClient } from '../../../../src/index';

describe('DspClient', () => {
	let dspClient: DspClient;

	beforeAll(async () => {
		dspClient = await amazonApi.getConfiguredApi(DspClient, {
			clientId: env.AMAZON_ADS_CLIENT_ID,
			clientSecret: env.AMAZON_ADS_CLIENT_SECRET,
			profileId: env.AMAZON_ADS_PROFILE_ID,
			refreshToken: env.AMAZON_ADS_REFRESH_TOKEN,
		});
	});

	it('should instantiate the api', () => {
		expect(dspClient).toBeDefined();
	});
});
