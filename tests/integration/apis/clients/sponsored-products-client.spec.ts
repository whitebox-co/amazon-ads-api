import * as env from '../../../environment';
import amazonApi, { SponsoredProductsClient } from '../../../../src/index';
import { addInterceptor, removeInterceptor } from '../../../../utils/payload-interceptors';
import {
	CreateCampaign,
	CreateCampaignCampaignTypeEnum,
	CreateCampaignTargetingTypeEnum,
} from '../../../../src/apis/models/sponsored-products';

describe('SponsoredProductsClient', () => {
	let interceptorId: any;
	let sponsoredProductsClient: SponsoredProductsClient;

	beforeAll(async () => {
		sponsoredProductsClient = await amazonApi.getConfiguredApi(SponsoredProductsClient, {
			clientId: env.AMAZON_ADS_CLIENT_ID,
			clientSecret: env.AMAZON_ADS_CLIENT_SECRET,
			profileId: env.AMAZON_ADS_PROFILE_ID,
			refreshToken: env.AMAZON_ADS_REFRESH_TOKEN,
		});
	});

	beforeEach(() => {
		const testName = expect.getState().currentTestName;
		interceptorId = addInterceptor(sponsoredProductsClient, testName);
	});

	afterEach(() => {
		removeInterceptor(sponsoredProductsClient, interceptorId);
	});

	it('should instantiate the api', () => {
		expect(sponsoredProductsClient).toBeDefined();
	});

	describe('#createCampaigns', () => {
		it('should create a single sponsored product campaign', async () => {
			const campaigns: CreateCampaign = {
				name: 'Marketplace_Test_Jan_12_1',
				campaignType: CreateCampaignCampaignTypeEnum.SponsoredProducts,
				targetingType: CreateCampaignTargetingTypeEnum.Manual,
			};

			const results = await sponsoredProductsClient.createCampaigns({
				amazonAdvertisingAPIClientId: env.AMAZON_ADS_CLIENT_ID,
				amazonAdvertisingAPIScope: env.AMAZON_ADS_PROFILE_ID,
				createCampaign: [campaigns],
			});

			expect(results.data).toBeDefined();
		});
	});
});
