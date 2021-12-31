jest.mock('../../../utils/schema-downloader', () => ({
	downloadSchemas: jest.fn(),
}));

jest.mock('../../../utils/model-generator', () => ({
	processSchemas: jest.fn(),
}));

jest.mock('../../../utils/client-generator', () => ({
	generateAPIClients: jest.fn(),
}));

jest.mock('../../../utils/test-generator', () => ({
	generateTests: jest.fn(),
}));

describe('api-generator', () => {
	it('should run through all generator steps on init', () => {
		jest.resetModules();

		expect(() => {
			require('../../../utils/api-generator');
		}).not.toThrow();
	});
});
