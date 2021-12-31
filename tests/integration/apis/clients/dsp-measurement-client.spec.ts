import * as env from '../../../environment';
import amazonApi, { DspMeasurementClient } from '../../../../src/index';

describe('DspMeasurementClient', () => {
	let dspMeasurementClient: DspMeasurementClient;

	beforeAll(async () => {
		dspMeasurementClient = await amazonApi.getConfiguredApi(DspMeasurementClient, {
			clientId: env.AMAZON_ADS_CLIENT_ID,
			clientSecret: env.AMAZON_ADS_CLIENT_SECRET,
			profileId: env.AMAZON_ADS_PROFILE_ID,
			refreshToken: env.AMAZON_ADS_REFRESH_TOKEN,
		});
	});

	it('should instantiate the api', () => {
		expect(dspMeasurementClient).toBeDefined();
	});
});
