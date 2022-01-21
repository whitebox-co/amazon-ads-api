import * as env from '../../../environment';
import amazonApi, { SponsoredDisplayClient } from '../../../../src/index';
import { addInterceptor, removeInterceptor } from '../../../../utils/payload-interceptors';

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
});
