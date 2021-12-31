export const integrationTestTemplate = `
import * as env from '../../../environment';
import amazonApi, { <%= apiClassName %> } from '../../../../src/index';

describe('<%= apiClassName %>', () => {
	let <%= apiInstanceName %>: <%= apiClassName %>;

	beforeAll(async () => {
		<%= apiInstanceName %>  = await amazonApi.getConfiguredApi(<%= apiClassName %>, {
			clientId: env.AMAZON_ADS_CLIENT_ID,
			clientSecret: env.AMAZON_ADS_CLIENT_SECRET,
			profileId: env.AMAZON_ADS_PROFILE_ID,
			refreshToken: env.AMAZON_ADS_REFRESH_TOKEN,
		});
	});

    it('should instantiate the api', () => {
		expect(<%= apiInstanceName %>).toBeDefined();
	});

    <% _(formattedMethodNames).each(function(formattedMethodName) { %>
        describe('<%= formattedMethodName %>', () => {
            // TODO: Implement Me!!
        })
    <% }) %>
});
`;
