import * as env from '../../../environment';
import amazonApi, { CommonEligibilityClient } from '../../../../src/index';
import { addInterceptor, removeInterceptor } from '../../../../utils/payload-interceptors';
import {
	ProductDetails,
	ProductEligibilityRequest,
	ProductEligibilityRequestAdTypeEnum,
} from '../../../../src/apis/models/common-eligibility';

describe('CommonEligibilityClient', () => {
	let interceptorId: any;
	let commonEligibilityClient: CommonEligibilityClient;

	beforeAll(async () => {
		commonEligibilityClient = await amazonApi.getConfiguredApi(CommonEligibilityClient, {
			clientId: env.AMAZON_ADS_CLIENT_ID,
			clientSecret: env.AMAZON_ADS_CLIENT_SECRET,
			profileId: env.AMAZON_ADS_PROFILE_ID,
			refreshToken: env.AMAZON_ADS_REFRESH_TOKEN,
		});
	});

	beforeEach(() => {
		const testName = expect.getState().currentTestName;
		interceptorId = addInterceptor(commonEligibilityClient, testName);
	});

	afterEach(() => {
		removeInterceptor(commonEligibilityClient, interceptorId);
	});

	it('should instantiate the api', () => {
		expect(commonEligibilityClient).toBeDefined();
	});

	describe('#productEligibility', () => {
		it('should verify a sponsored product eligibility', async () => {
			const productDetails: ProductDetails = { asin: 'Test asin', sku: 'Test sku' };
			const product: ProductEligibilityRequest = {
				adType: ProductEligibilityRequestAdTypeEnum.Sp,
				productDetailsList: [productDetails],
			};

			const result = await commonEligibilityClient.productEligibility({
				amazonAdvertisingAPIClientId: env.AMAZON_ADS_CLIENT_ID,
				amazonAdvertisingAPIScope: env.AMAZON_ADS_PROFILE_ID,
				productEligibilityRequest: product,
			});

			expect(result.data).toBeDefined();
		});

		it('should verify a sponsored brand eligibility', async () => {
			const productDetails: ProductDetails = { asin: 'Test asin', sku: 'Test sku' };
			const product: ProductEligibilityRequest = {
				adType: ProductEligibilityRequestAdTypeEnum.Sb,
				productDetailsList: [productDetails],
			};

			const result = await commonEligibilityClient.productEligibility({
				amazonAdvertisingAPIClientId: env.AMAZON_ADS_CLIENT_ID,
				amazonAdvertisingAPIScope: env.AMAZON_ADS_PROFILE_ID,
				productEligibilityRequest: product,
			});

			expect(result.data).toBeDefined();
		});
	});
});
