import * as env from '../../../environment';
import amazonApi, { SponsoredBrandsClient } from '../../../../src/index';
import { addInterceptor, removeInterceptor } from '../../../../utils/payload-interceptors';
import {
	SBCreateCampaignWithExpressions,
	SBCreateCampaignWithKeywords,
	SBVideoCreateCampaignWithExpressions,
	SBVideoCreateCampaignWithKeywords,
	BudgetType,
	AdFormat,
	MatchType,
	NegativeMatchType,
	ProductPredicateType,
	SBCreative,
	SBLandingPage,
	SBVideoCreative,
} from '../../../../src/apis/models/sponsored-brands';

describe('SponsoredBrandsClient', () => {
	let interceptorId: any;
	let sponsoredBrandsClient: SponsoredBrandsClient;

	beforeAll(async () => {
		sponsoredBrandsClient = await amazonApi.getConfiguredApi(SponsoredBrandsClient, {
			clientId: env.AMAZON_ADS_CLIENT_ID,
			clientSecret: env.AMAZON_ADS_CLIENT_SECRET,
			profileId: env.AMAZON_ADS_PROFILE_ID,
			refreshToken: env.AMAZON_ADS_REFRESH_TOKEN,
		});
	});

	beforeEach(() => {
		const testName = expect.getState().currentTestName;
		interceptorId = addInterceptor(sponsoredBrandsClient, testName);
	});

	afterEach(() => {
		removeInterceptor(sponsoredBrandsClient, interceptorId);
	});

	it('should instantiate the api', () => {
		expect(sponsoredBrandsClient).toBeDefined();
	});

	describe('#createCampaignsSb', () => {
		// Test input gathered from this page -
		// https://advertising.amazon.com/API/docs/en-us/bulksheets/sb/sb-examples/sb-create
		// We need to override generated headers because Amazon docs are incorrect
		// - returns 415 error with the generated headers
		const options = { headers: { ['Content-Type']: 'application/json' } };

		it('should create campaign of type SBCreateCampaignWithKeywords', async () => {
			const creativeAsset: SBCreative = {
				brandLogoAssetID: 'AWz-C_2InEZrJWCZIR5a',
				brandName: 'Sample Creative Brand Name',
				headline: 'Sample Creative Headline',
			};

			const landingPage: SBLandingPage = {
				asins: ['B018UQ5AMS', 'B07PC7MHQ8', 'B07C1XC3GF'],
			};

			const campaign: SBCreateCampaignWithKeywords = {
				name: 'SBCreateCampaignWithKeywords_1',
				budget: 1,
				budgetType: BudgetType.Daily,
				adFormat: AdFormat.ProductCollection,
				startDate: '20220114',
				endDate: '20220114',
				keywords: [{ keywordText: 'Test', matchType: MatchType.Exact, bid: 0 }],
				negativeKeywords: [{ keywordText: 'Bad', matchType: NegativeMatchType.NegativeExact }],
				creative: creativeAsset,
				brandEntityId: 'ENTITY1233121',
				landingPage,
			};

			const result = await sponsoredBrandsClient.createCampaigns(
				{
					amazonAdvertisingAPIClientId: env.AMAZON_ADS_CLIENT_ID,
					amazonAdvertisingAPIScope: env.AMAZON_ADS_PROFILE_ID,
					sBCreateCampaignRequest: [campaign],
				},

				options
			);

			expect(result.data).toBeDefined();
		});

		it('should create campaign of type SBCreateCampaignWithExpressions', async () => {
			const creativeAsset: SBCreative = {
				brandLogoAssetID: 'AWz-C_2InEZrJWCZIR5a',
				brandName: 'Sample Creative Brand Name',
				headline: 'Sample Creative Headline',
			};

			const landingPage: SBLandingPage = {
				asins: ['B018UQ5AMS', 'B07PC7MHQ8', 'B07C1XC3GF'],
			};

			const campaign: SBCreateCampaignWithExpressions = {
				name: 'SBCreateCampaignWithExpressions_1',
				budget: 1,
				budgetType: BudgetType.Daily,
				adFormat: AdFormat.ProductCollection,
				startDate: '20220114',
				endDate: '20220114',
				targets: [{ expressions: [{ type: ProductPredicateType.AsinSameAs, value: 'TestValue' }], bid: 0 }],
				negativeTargets: [{ expressions: [{ type: ProductPredicateType.AsinSameAs, value: 'NegTestValue' }] }],
				creative: creativeAsset,
				brandEntityId: 'ENTITY1233121',
				landingPage,
			};

			const result = await sponsoredBrandsClient.createCampaigns(
				{
					amazonAdvertisingAPIClientId: env.AMAZON_ADS_CLIENT_ID,
					amazonAdvertisingAPIScope: env.AMAZON_ADS_PROFILE_ID,
					sBCreateCampaignRequest: [campaign],
				},
				options
			);

			expect(result.data).toBeDefined();
		});

		it('should create campaign of type SBVideoCreateCampaignWithExpressions', async () => {
			const creativeAsset: SBVideoCreative = { asins: ['B018UQ5AMS'], videoMediaIds: ['ams123.3123.d'] };

			const campaign: SBVideoCreateCampaignWithExpressions = {
				name: 'SBVideoCreateCampaignWithExpressions_1',
				budget: 1,
				budgetType: BudgetType.Daily,
				adFormat: AdFormat.Video,
				creative: creativeAsset,
				startDate: '20220114',
				endDate: '20220114',
				brandEntityId: 'ENTITY1233121',
			};

			const result = await sponsoredBrandsClient.createCampaigns(
				{
					amazonAdvertisingAPIClientId: env.AMAZON_ADS_CLIENT_ID,
					amazonAdvertisingAPIScope: env.AMAZON_ADS_PROFILE_ID,
					sBCreateCampaignRequest: [campaign],
				},
				options
			);

			expect(result.data).toBeDefined();
		});

		it('should create campaign of type SBVideoCreateCampaignWithKeywords', async () => {
			const creativeAsset: SBVideoCreative = { asins: ['B018UQ5AMS'], videoMediaIds: ['ams123.3123.d'] };

			const campaign: SBVideoCreateCampaignWithKeywords = {
				name: 'SBVideoCreateCampaignWithKeywords_1',
				budget: 1,
				budgetType: BudgetType.Daily,
				adFormat: AdFormat.Video,
				creative: creativeAsset,
				startDate: '20220114',
				endDate: '20220114',
				brandEntityId: 'ENTITY1233121',
			};

			const result = await sponsoredBrandsClient.createCampaigns(
				{
					amazonAdvertisingAPIClientId: env.AMAZON_ADS_CLIENT_ID,
					amazonAdvertisingAPIScope: env.AMAZON_ADS_PROFILE_ID,
					sBCreateCampaignRequest: [campaign],
				},
				options
			);

			expect(result.data).toBeDefined();
		});
	});
});
