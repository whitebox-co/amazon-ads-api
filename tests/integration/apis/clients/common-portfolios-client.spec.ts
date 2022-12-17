import * as env from '../../../environment';
import amazonApi, { CommonPortfoliosClient } from '../../../../src/index';

describe('CommonPortfoliosClient', () => {
	let commonPortfoliosClient: CommonPortfoliosClient;

	beforeAll(async () => {
		commonPortfoliosClient = await amazonApi.getConfiguredApi(CommonPortfoliosClient, {
			clientId: env.AMAZON_ADS_CLIENT_ID,
			clientSecret: env.AMAZON_ADS_CLIENT_SECRET,
			profileId: env.AMAZON_ADS_PROFILE_ID,
			refreshToken: env.AMAZON_ADS_REFRESH_TOKEN,
		});
	});

	it('should instantiate the api', () => {
		expect(commonPortfoliosClient).toBeDefined();
	});

	it('should retrieve a listing of Portfolios', async () => {
		const response = await commonPortfoliosClient.listPortfolios({
			amazonAdvertisingAPIClientId: env.AMAZON_ADS_CLIENT_ID,
			amazonAdvertisingAPIScope: '181452647798575',
		});

		const portfolioNames = response.data.map((portfolio) => {
			return portfolio.name;
		});

		expect(portfolioNames.length).toBeGreaterThanOrEqual(0);
	}, 10000);
});
