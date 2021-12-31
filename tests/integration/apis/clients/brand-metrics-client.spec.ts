import * as env from '../../../environment';
import amazonApi, { BrandMetricsClient } from '../../../../src/index';

describe('BrandMetricsClient', () => {
	let brandMetricsClient: BrandMetricsClient;

	beforeAll(async () => {
		brandMetricsClient = await amazonApi.getConfiguredApi(BrandMetricsClient, {
			clientId: env.AMAZON_ADS_CLIENT_ID,
			clientSecret: env.AMAZON_ADS_CLIENT_SECRET,
			profileId: env.AMAZON_ADS_PROFILE_ID,
			refreshToken: env.AMAZON_ADS_REFRESH_TOKEN,
		});
	});

	it('should instantiate the api', () => {
		expect(brandMetricsClient).toBeDefined();
	});
});
