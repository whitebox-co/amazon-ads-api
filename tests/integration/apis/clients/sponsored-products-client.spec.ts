import * as env from '../../../environment';
import amazonApi, { SponsoredProductsClient } from '../../../../src/index';
import { addInterceptor, removeInterceptor } from '../../../../utils/payload-interceptors';
import {
	AdGroup,
	CreateCampaign,
	CreateCampaignCampaignTypeEnum,
	CreateCampaignTargetingTypeEnum,
	CreateKeyword,
	CreateNegativeKeyword,
	CreateNegativeTargetingClause,
	CreateProductAd,
	CreateTargetingClause,
	ExpressionType,
	MatchType,
	NegativeMatchType,
	State,
	TargetingExpressionPredicate,
	TargetingExpressionPredicateTypeEnum,
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

	/** *
	 * These tests only verify that a response is received from Amazon, they do
	 * not verify that the resource was succesfully created on their platform.
	 * In order to verify, you will need to replace the test values with valid
	 * ASINs and/or SKUs. All tests create live resources on Amazon Ads platform in a PAUSED
	 * state. Campaigns are created synchronously and are dependent on the previous
	 * resource id. Run the tests one at a time to get the needed resource ids.
	 * Ex: npm test -- -t "createCampaigns"
	 * Response outputs are in docs/integration/payloads/methods
	 */
	describe('#createCampaigns', () => {
		it('should create a single sponsored product campaign', async () => {
			// The only required property according to the specs is name,
			// however if a request is made without the other properties Amazon returns a 207 response
			// and the campaign is not created.
			const campaigns: CreateCampaign = {
				name: 'API_SDK_TEST_1',
				campaignType: CreateCampaignCampaignTypeEnum.SponsoredProducts,
				targetingType: CreateCampaignTargetingTypeEnum.Manual,
				state: State.Paused,
				dailyBudget: 1,
				startDate: '20220113',
			};

			const results = await sponsoredProductsClient.createCampaigns({
				amazonAdvertisingAPIClientId: env.AMAZON_ADS_CLIENT_ID,
				amazonAdvertisingAPIScope: env.AMAZON_ADS_PROFILE_ID,
				createCampaign: [campaigns],
			});

			expect(results.data).toBeDefined();
			expect(results.data[0].campaignId).toBeDefined();
		});
	});

	describe('#createAdGroups', () => {
		it('should create an ad group for the specified campaignId', async () => {
			const adGroup: AdGroup = {
				name: 'TEST_AD_GROUP',
				campaignId: 1111111111,
				state: State.Paused,
				defaultBid: 1,
			};

			const results = await sponsoredProductsClient.createAdGroups({
				amazonAdvertisingAPIClientId: env.AMAZON_ADS_CLIENT_ID,
				amazonAdvertisingAPIScope: env.AMAZON_ADS_PROFILE_ID,
				createAdGroup: [adGroup],
			});

			expect(results.data).toBeDefined();
			expect(results.data[0].adGroupId).toBeDefined();
		});
	});

	describe('#createProductAds', () => {
		it('should should create product ad for a SELLER account type', async () => {
			const productAd: CreateProductAd = {
				campaignId: 1111111111,
				adGroupId: 222222222,
				state: State.Paused,
				sku: 'TEST_SKU',
			};

			const results = await sponsoredProductsClient.createProductAds({
				amazonAdvertisingAPIClientId: env.AMAZON_ADS_CLIENT_ID,
				amazonAdvertisingAPIScope: env.AMAZON_ADS_PROFILE_ID,
				createProductAd: [productAd],
			});

			expect(results.data).toBeDefined();
			expect(results.data[0].adId).toBeDefined();
		});

		it('should should create product ad for a VENDOR account type', async () => {
			const productAd: CreateProductAd = {
				campaignId: 1111111111,
				adGroupId: 222222222,
				asin: 'TEST_ASIN',
				state: State.Paused,
			};

			const results = await sponsoredProductsClient.createProductAds({
				amazonAdvertisingAPIClientId: env.AMAZON_ADS_CLIENT_ID,
				amazonAdvertisingAPIScope: env.AMAZON_ADS_PROFILE_ID,
				createProductAd: [productAd],
			});

			expect(results.data).toBeDefined();
			expect(results.data[0].adId).toBeDefined();
		});
	});

	describe('#createKeywords', () => {
		it('should create keywords for the campaign', async () => {
			const keyword: CreateKeyword = {
				campaignId: 1111111111,
				adGroupId: 222222222,
				state: State.Paused,
				keywordText: 'TEST_KEYWORD',
				matchType: MatchType.Exact,
			};
			const results = await sponsoredProductsClient.createKeywords({
				amazonAdvertisingAPIClientId: env.AMAZON_ADS_CLIENT_ID,
				amazonAdvertisingAPIScope: env.AMAZON_ADS_PROFILE_ID,
				createKeyword: [keyword],
			});

			expect(results.data).toBeDefined();
			expect(results.data[0].keywordId).toBeDefined();
		});
	});

	describe('#createNegativeKeywords', () => {
		it('should create negative keywords for the campaign', async () => {
			const keyword: CreateNegativeKeyword = {
				campaignId: 1111111111,
				adGroupId: 222222222,
				state: State.Paused,
				keywordText: 'TEST_NEGATIVE_KEYWORD',
				matchType: NegativeMatchType.NegativeExact,
			};
			const results = await sponsoredProductsClient.createNegativeKeywords({
				amazonAdvertisingAPIClientId: env.AMAZON_ADS_CLIENT_ID,
				amazonAdvertisingAPIScope: env.AMAZON_ADS_PROFILE_ID,
				createNegativeKeyword: [keyword],
			});

			expect(results.data).toBeDefined();
			expect(results.data[0].keywordId).toBeDefined();
		});
	});

	describe('#createTargetingClauses', () => {
		it('should create targets for the campaign', async () => {
			const expressionPred: TargetingExpressionPredicate = {
				value: 'TEST TARGET',
				type: TargetingExpressionPredicateTypeEnum.AsinSameAs,
			};

			const target: CreateTargetingClause = {
				campaignId: 1111111111,
				adGroupId: 222222222,
				state: State.Paused,
				expressionType: ExpressionType.Manual,
				expression: [expressionPred],
			};

			const results = await sponsoredProductsClient.createTargetingClauses({
				amazonAdvertisingAPIClientId: env.AMAZON_ADS_CLIENT_ID,
				amazonAdvertisingAPIScope: env.AMAZON_ADS_PROFILE_ID,
				createTargetingClause: [target],
			});

			expect(results.data).toBeDefined();
			expect(results.data[0].targetId).toBeDefined();
		});
	});

	describe('#createNegativeTargetingClauses', () => {
		it('should create negative targets for the campaign', async () => {
			const expressionPred: TargetingExpressionPredicate = {
				value: 'TEST_NEGATIVE_TARGET',
				type: TargetingExpressionPredicateTypeEnum.AsinSameAs,
			};

			const target: CreateNegativeTargetingClause = {
				campaignId: 1111111111,
				adGroupId: 222222222,
				state: State.Paused,
				expressionType: ExpressionType.Manual,
				expression: [expressionPred],
			};

			const results = await sponsoredProductsClient.createNegativeTargetingClauses({
				amazonAdvertisingAPIClientId: env.AMAZON_ADS_CLIENT_ID,
				amazonAdvertisingAPIScope: env.AMAZON_ADS_PROFILE_ID,
				createNegativeTargetingClause: [target],
			});

			expect(results.data).toBeDefined();
			expect(results.data[0].targetId).toBeDefined();
		});
	});

	describe('#getCampaignEx', () => {
		it('should return extended detail for the campaign', async () => {
			const results = await sponsoredProductsClient.getCampaignEx({
				amazonAdvertisingAPIClientId: env.AMAZON_ADS_CLIENT_ID,
				amazonAdvertisingAPIScope: env.AMAZON_ADS_PROFILE_ID,
				campaignId: 1111111111,
			});

			expect(results.data).toBeDefined();
			expect(results.data.servingStatus).toBeDefined();
		});
	});
});
