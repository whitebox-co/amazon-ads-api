import * as env from '../../../environment';
import amazonApi, { CommonCreativeAssetsClient } from '../../../../src/index';
import { addInterceptor, removeInterceptor } from '../../../../utils/payload-interceptors';
import { CaAssociatedSubEntity, InlineObject, InlineObject1 } from '../../../../src/apis/models/common-creative-assets';

describe('CommonCreativeAssetsClient', () => {
	let interceptorId: any;
	let commonCreativeAssetsClient: CommonCreativeAssetsClient;

	beforeAll(async () => {
		commonCreativeAssetsClient = await amazonApi.getConfiguredApi(CommonCreativeAssetsClient, {
			clientId: env.AMAZON_ADS_CLIENT_ID,
			clientSecret: env.AMAZON_ADS_CLIENT_SECRET,
			profileId: env.AMAZON_ADS_PROFILE_ID,
			refreshToken: env.AMAZON_ADS_REFRESH_TOKEN,
		});
	});

	beforeEach(() => {
		const testName = expect.getState().currentTestName;
		interceptorId = addInterceptor(commonCreativeAssetsClient, testName);
	});

	afterEach(() => {
		removeInterceptor(commonCreativeAssetsClient, interceptorId);
	});

	it('should instantiate the api', () => {
		expect(commonCreativeAssetsClient).toBeDefined();
	});

	describe('#getUploadLocation', () => {
		const asset: InlineObject1 = { fileName: 'test_file.png' };
		it('should', async () => {
			const result = await commonCreativeAssetsClient.getUploadLocation({
				amazonAdvertisingAPIScope: env.AMAZON_ADS_PROFILE_ID,
				amazonAdvertisingAPIClientId: env.AMAZON_ADS_CLIENT_ID,
				inlineObject1: asset,
			});

			expect(result.data).toBeDefined();
		});
	});

	describe('#registerAsset', () => {
		// /brands resource is not currently part of Amazons schemas on their site, we will need to add this manually
		// https://advertising-api.amazon.com/brands
		const brandEntity: CaAssociatedSubEntity = { brandEntityId: 'ENTITYxxxxx' };

		const creative: InlineObject = {
			url: 'amazons3bucket_provided from #getUploadLocation',
			name: 'test_file',
			associatedSubEntityList: [brandEntity],
		};

		it('should register the asset to the url provided', async () => {
			const result = await commonCreativeAssetsClient.registerAsset({
				amazonAdvertisingAPIScope: env.AMAZON_ADS_PROFILE_ID,
				amazonAdvertisingAPIClientId: env.AMAZON_ADS_CLIENT_ID,
				inlineObject: creative,
			});

			expect(result.data).toBeDefined();
		});
	});
});
