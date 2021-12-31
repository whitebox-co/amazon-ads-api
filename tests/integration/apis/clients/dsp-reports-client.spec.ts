import * as env from '../../../environment';
import amazonApi, { DspReportsClient } from '../../../../src/index';

describe('DspReportsClient', () => {
	let dspReportsClient: DspReportsClient;

	beforeAll(async () => {
		dspReportsClient = await amazonApi.getConfiguredApi(DspReportsClient, {
			clientId: env.AMAZON_ADS_CLIENT_ID,
			clientSecret: env.AMAZON_ADS_CLIENT_SECRET,
			profileId: env.AMAZON_ADS_PROFILE_ID,
			refreshToken: env.AMAZON_ADS_REFRESH_TOKEN,
		});
	});

	it('should instantiate the api', () => {
		expect(dspReportsClient).toBeDefined();
	});
});
