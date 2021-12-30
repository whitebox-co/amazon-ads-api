jest.mock('../../../utils/schema-downloader', () => ({
	checkForChanges: jest.fn(),
}));

describe('check-for-changes', () => {
	it('should run checkForChanges on init when node env var RUN_API_GENERATOR is set', () => {
		jest.resetModules();

		process.env.RUN_CHECK_FOR_CHANGES = 'true';

		expect(() => {
			require('../../../utils/check-for-changes');
		}).not.toThrow();
	});
});
