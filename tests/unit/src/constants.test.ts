import { PATHS, SCHEMAS } from '../../../src/constants';

describe('constants', () => {
	it('PATHS should not have changed', () => {
		const expectedPaths = {
			SCHEMAS: './docs/schemas',
			CUSTOM_SCHEMAS: './docs/custom-schemas',
			SCHEMAS_DOCS: './docs/schemas.js',
			APIS: './src/apis',
			MODELS: './src/apis/models',
			PRETTIER: './node_modules/.bin/prettier',
			CLIENTS: './src/apis/clients',
			TS_CONFIG: 'tsconfig.json',
			TS_LIB: 'node_modules/typescript/lib',
			INTEGRATION_TESTS: './tests/integration/apis',
			ESLINT: './node_modules/.bin/eslint',
		};

		expect(PATHS).toEqual(expectedPaths);
	});

	it('SCHEMAS should not have changed', () => {
		const expectedSchemas = [
			{
				name: 'Authorization - Profiles',
				schemaUrl: 'https://d3a0d0y2hgofx6.cloudfront.net/openapi/en-us/profiles/3-0/openapi.yaml',
				version: '3.0',
			},
			{
				name: 'Authorization - Manager Account',
				schemaUrl: 'https://dtrnk0o2zy01c.cloudfront.net/openapi/en-us/dest/ManagerAccount_prod_3p.json',
				version: '3.0',
			},
			{
				name: 'Common - Billing',
				schemaUrl: 'https://dtrnk0o2zy01c.cloudfront.net/openapi/en-us/dest/Billing_prod_3p.json',
				version: '3.0',
			},
			{
				name: 'Common - Audiences',
				schemaUrl: 'https://dtrnk0o2zy01c.cloudfront.net/openapi/en-us/dest/Audiences_prod_3p.json',
				version: '3.0',
			},
			{
				name: 'Common - Creative Assets',
				schemaUrl:
					'https://d3a0d0y2hgofx6.cloudfront.net/openapi/en-us/creative-asset-library/creative-asset-library-openapi.yaml',
				version: '1.0',
			},
			{
				name: 'Common - Change History',
				schemaUrl: 'https://dtrnk0o2zy01c.cloudfront.net/openapi/en-us/dest/Changehistory_prod_3p.json',
				version: '3.0',
			},
			{
				name: 'Common - Eligibility',
				schemaUrl: 'https://dtrnk0o2zy01c.cloudfront.net/openapi/en-us/dest/Eligibility_prod_3p.json',
				version: '3.0',
			},
			{
				name: 'Common - Insights',
				schemaUrl: 'https://dtrnk0o2zy01c.cloudfront.net/openapi/en-us/dest/Insights_prod_3p.json',
				version: '3.0',
			},
			{
				name: 'Common - Localization',
				schemaUrl: 'https://dtrnk0o2zy01c.cloudfront.net/openapi/en-us/dest/Localization_prod_3p.json',
				version: '3.0',
			},
			{
				name: 'Common - Product MetaData',
				schemaUrl: 'https://dtrnk0o2zy01c.cloudfront.net/openapi/en-us/dest/ProductSelector_prod_3p.json',
				version: '3.0',
			},
			{
				name: 'Attribution',
				schemaUrl: 'https://dtrnk0o2zy01c.cloudfront.net/openapi/en-us/dest/AmazonAttribution_prod_3p.json',
				version: '3.0',
			},
			{
				name: 'Brand Metrics',
				schemaUrl: 'https://dtrnk0o2zy01c.cloudfront.net/openapi/en-us/dest/BrandMetrics_prod_3p.json',
				version: '3.0',
			},
			{
				name: 'DSP',
				schemaUrl: 'https://d3a0d0y2hgofx6.cloudfront.net/openapi/en-us/dsp/3-1/openapi.yaml',
				version: '3.1',
			},
			{
				name: 'DSP - Measurement',
				schemaUrl: 'https://dtrnk0o2zy01c.cloudfront.net/openapi/en-us/dest/Measurement_prod_3p.json',
				version: '3.0',
			},
			{
				name: 'DSP - Reports',
				schemaUrl: 'https://dtrnk0o2zy01c.cloudfront.net/openapi/en-us/dest/DSPReports_prod_3p.json',
				version: '3.0',
			},
			{
				name: 'DSP - Advertiser',
				schemaUrl: 'https://d3a0d0y2hgofx6.cloudfront.net/openapi/en-us/dsp/3-0/advertiser.yaml',
				version: '3.0',
			},
			{
				name: 'Sponsored Brands',
				schemaUrl: 'https://d3a0d0y2hgofx6.cloudfront.net/openapi/en-us/sponsored-brands/3-0/openapi.yaml',
				version: '3.0',
			},
			{
				name: 'Sponsored Brands',
				schemaUrl: 'https://dtrnk0o2zy01c.cloudfront.net/openapi/en-us/dest/SponsoredBrands_prod_3p.json',
				version: '3.0',
			},
			{
				name: 'Sponsored Brands - Pre Moderation',
				schemaUrl: 'https://dtrnk0o2zy01c.cloudfront.net/openapi/en-us/dest/PreModeration_prod_3p.json',
				version: '3.0',
			},
			{
				name: 'Sponsored Brands - Category Benchmark',
				schemaUrl:
					'https://dtrnk0o2zy01c.cloudfront.net/openapi/en-us/dest/SponsoredBrandsCategoryBenchmark_prod_3p.json',
				version: '3.0',
			},
			{
				name: 'Sponsored Brands - Stores',
				schemaUrl: '',
				version: '',
			},
			{
				name: 'Sponsored Brands - Reports',
				schemaUrl: '',
				version: '',
			},
			{
				name: 'Sponsored Brands - Snapshots',
				schemaUrl: '',
				version: '',
			},
			{
				name: 'Sponsored Display',
				schemaUrl: 'https://d3a0d0y2hgofx6.cloudfront.net/openapi/en-us/sponsored-display/3-0/openapi.yaml',
				version: '3.0',
			},
			{
				name: 'Sponsored Display - Extra',
				schemaUrl: 'https://dtrnk0o2zy01c.cloudfront.net/openapi/en-us/dest/SponsoredDisplay_prod_3p.json',
				version: '3.0',
			},
			{
				name: 'Sponsored Products',
				schemaUrl: 'https://d3a0d0y2hgofx6.cloudfront.net/openapi/en-us/sponsored-products/2-0/openapi.yaml',
				version: '2.0',
			},
			{
				name: 'Sponsored Products - Extra',
				schemaUrl: 'https://dtrnk0o2zy01c.cloudfront.net/openapi/en-us/dest/SponsoredProducts_prod_3p.json',
				version: '3.0',
			},
			{
				name: 'Data Provider',
				schemaUrl: 'https://d3a0d0y2hgofx6.cloudfront.net/openapi/en-us/data-provider/openapi.yaml',
				version: '2.0',
			},
		];

		expect(SCHEMAS).toEqual(expectedSchemas);
	});
});
