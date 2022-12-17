import * as env from '../../../environment';
import amazonApi, { SponsoredDisplayClient } from '../../../../src/index';
import { addInterceptor, removeInterceptor } from '../../../../utils/payload-interceptors';
import {
	CreateAdGroup,
	CreateAdGroupStateEnum,
	CreateCampaign,
	CreateCampaignBudgetTypeEnum,
	CreateCampaignStateEnum,
	CreateCreative,
	CreateNegativeTargetingClause,
	CreateProductAd,
	CreateProductAdStateEnum,
	CreateTargetingClause,
	CreateTargetingClauseExpressionTypeEnum,
	CreateNegativeTargetingClauseExpressionTypeEnum,
	CustomImageCreativeProperties,
	NegativeTargetingExpression,
	Tactic,
	TargetingPredicate,
	TargetingPredicateBase,
	TargetingPredicateBaseTypeEnum,
	TargetingPredicateTypeEnum,
	TargetingPredicateNested,
	TargetingPredicateNestedTypeEnum,
	CreateNegativeTargetingClauseStateEnum,
	NegativeTargetingExpressionTypeEnum,
	Image,
	ImageCroppingCoordinates,
	CreativeProperties,
} from '../../../../src/apis/models/sponsored-display';

describe('SponsoredDisplayClient', () => {
	let interceptorId: any;
	let sponsoredDisplayClient: SponsoredDisplayClient;

	beforeAll(async () => {
		sponsoredDisplayClient = await amazonApi.getConfiguredApi(SponsoredDisplayClient, {
			clientId: env.AMAZON_ADS_CLIENT_ID,
			clientSecret: env.AMAZON_ADS_CLIENT_SECRET,
			profileId: env.AMAZON_ADS_PROFILE_ID,
			refreshToken: env.AMAZON_ADS_REFRESH_TOKEN,
		});
	});

	beforeEach(() => {
		const testName = expect.getState().currentTestName;
		interceptorId = addInterceptor(sponsoredDisplayClient, testName);
	});

	afterEach(() => {
		removeInterceptor(sponsoredDisplayClient, interceptorId);
	});

	it('should instantiate the api', () => {
		expect(sponsoredDisplayClient).toBeDefined();
	});

	describe('#createCampaigns', () => {
		it('should create a sponsored display campaign', async () => {
			const campaign: CreateCampaign = {
				name: 'Test Campaign Name',
				state: CreateCampaignStateEnum.Paused,
				startDate: '20220113',
				endDate: '20220113',
				budget: 1,
				budgetType: CreateCampaignBudgetTypeEnum.Daily,
				tactic: Tactic.T00020,
			};

			const result = await sponsoredDisplayClient.createCampaigns({
				amazonAdvertisingAPIScope: env.AMAZON_ADS_PROFILE_ID,
				amazonAdvertisingAPIClientId: env.AMAZON_ADS_CLIENT_ID,
				createCampaign: [campaign],
			});

			expect(result.data).toBeDefined();
		});
	});

	describe('#createAdGroups', () => {
		const adGroup: CreateAdGroup = {
			name: 'Test Ad Group',
			campaignId: 222222222,
			state: CreateAdGroupStateEnum.Paused,
		};

		it('should create an ad group for sponsored display campaign', async () => {
			const result = await sponsoredDisplayClient.createAdGroups({
				amazonAdvertisingAPIScope: env.AMAZON_ADS_PROFILE_ID,
				amazonAdvertisingAPIClientId: env.AMAZON_ADS_CLIENT_ID,
				createAdGroup: [adGroup],
			});

			expect(result.data).toBeDefined();
		});
	});

	describe('#createProductAds', () => {
		it('should create a product ad for sponsored display campaign', async () => {
			const productAd: CreateProductAd = {
				campaignId: 222222222,
				adGroupId: 11111111111,
				state: CreateProductAdStateEnum.Paused,
				sku: 'TEST_SKU',
				asin: 'TEST_SKU',
			};

			const result = await sponsoredDisplayClient.createProductAds({
				amazonAdvertisingAPIScope: env.AMAZON_ADS_PROFILE_ID,
				amazonAdvertisingAPIClientId: env.AMAZON_ADS_CLIENT_ID,
				createProductAd: [productAd],
			});

			expect(result.data).toBeDefined();
		});
	});

	describe('#createTargetingClauses', () => {
		it('should create targeting for products', async () => {
			const targetClause: TargetingPredicate = {
				type: TargetingPredicateTypeEnum.SimilarProduct,
			};

			const target: CreateTargetingClause = {
				adGroupId: 11111111111,
				expression: [targetClause],
				expressionType: CreateTargetingClauseExpressionTypeEnum.Manual,
			};

			const result = await sponsoredDisplayClient.createTargetingClauses({
				amazonAdvertisingAPIScope: env.AMAZON_ADS_PROFILE_ID,
				amazonAdvertisingAPIClientId: env.AMAZON_ADS_CLIENT_ID,
				createTargetingClause: [target],
			});

			expect(result.data).toBeDefined();
		});

		it('should create targeting for audiences', async () => {
			const targetValue: TargetingPredicateBase = {
				type: TargetingPredicateBaseTypeEnum.AudienceSameAs,
				value: 'Test Audience',
			};

			const targetClause: TargetingPredicateNested = {
				type: TargetingPredicateNestedTypeEnum.Audience,
				value: [targetValue],
			};

			const target: CreateTargetingClause = {
				adGroupId: 11111111111,
				expression: [targetClause],
				expressionType: CreateTargetingClauseExpressionTypeEnum.Manual,
			};

			const result = await sponsoredDisplayClient.createTargetingClauses({
				amazonAdvertisingAPIScope: env.AMAZON_ADS_PROFILE_ID,
				amazonAdvertisingAPIClientId: env.AMAZON_ADS_CLIENT_ID,
				createTargetingClause: [target],
			});

			expect(result.data).toBeDefined();
		});
	});

	describe('#createNegativeTargetingClauses', () => {
		it('should create negative targets', async () => {
			const targetValue: NegativeTargetingExpression = {
				type: NegativeTargetingExpressionTypeEnum.AsinSameAs,
				value: 'Test Value',
			};

			const target: CreateNegativeTargetingClause = {
				expression: [targetValue],
				expressionType: CreateNegativeTargetingClauseExpressionTypeEnum.Manual,
				state: CreateNegativeTargetingClauseStateEnum.Paused,
				adGroupId: 11111111111,
			};

			const result = await sponsoredDisplayClient.createNegativeTargetingClauses({
				amazonAdvertisingAPIScope: env.AMAZON_ADS_PROFILE_ID,
				amazonAdvertisingAPIClientId: env.AMAZON_ADS_CLIENT_ID,
				createNegativeTargetingClause: [target],
			});

			expect(result.data).toBeDefined();
		});
	});

	describe('#createCreatives', () => {
		it('should create a custom creative', async () => {
			const coordinates: ImageCroppingCoordinates = { top: 1, left: 2, height: 100, width: 100 };
			// The asset information comes from following the flow of the creative assets client
			// https://advertising.amazon.com/API/docs/en-us/creative-asset-library
			const picture: Image = {
				assetId: 'amzn1.assetlibrary.asset1.becf0adee0b0dc4e8ab96f3db46bxxxx',
				assetVersion: 'version_v1',
				croppingCoordinates: coordinates,
			};

			const creativeProps: CustomImageCreativeProperties = {
				rectCustomImage: picture,
				squareCustomImage: picture,
			};

			const creative: CreateCreative = { adGroupId: 11111111111, properties: creativeProps };
			const result = await sponsoredDisplayClient.createCreatives({
				amazonAdvertisingAPIScope: env.AMAZON_ADS_PROFILE_ID,
				amazonAdvertisingAPIClientId: env.AMAZON_ADS_CLIENT_ID,
				createCreative: [creative],
			});

			expect(result.data).toBeDefined();
		});

		it('should create a headline creative', async () => {
			const coordinates: ImageCroppingCoordinates = { top: 1, left: 2, height: 100, width: 100 };

			const picture: Image = {
				assetId: 'amzn1.assetlibrary.asset1.becf0adee0b0dc4e8ab96f3db46bxxxx',
				assetVersion: 'version_v1',
				croppingCoordinates: coordinates,
			};

			const creativeProps: CreativeProperties = {
				brandLogo: picture,
				headline: 'Test Headline',
			};

			const creative: CreateCreative = { adGroupId: 11111111111, properties: creativeProps };

			const result = await sponsoredDisplayClient.createCreatives({
				amazonAdvertisingAPIScope: env.AMAZON_ADS_PROFILE_ID,
				amazonAdvertisingAPIClientId: env.AMAZON_ADS_CLIENT_ID,
				createCreative: [creative],
			});

			expect(result.data).toBeDefined();
		});
	});

	describe('#getCampaignResponseEx', () => {
		it('should return extended detail for the display campaign', async () => {
			const result = await sponsoredDisplayClient.getCampaignResponseEx({
				amazonAdvertisingAPIScope: env.AMAZON_ADS_PROFILE_ID,
				amazonAdvertisingAPIClientId: env.AMAZON_ADS_CLIENT_ID,
				campaignId: 222222222,
			});
			expect(result.data).toBeDefined();
		});
	});
});
