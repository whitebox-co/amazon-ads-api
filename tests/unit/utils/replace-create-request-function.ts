import replace from 'replace-in-file';

import { replaceCreateRequestFunction } from '../../../utils/replace-create-request-function';

jest.mock('replace-in-file');

describe('replace-create-request-function', () => {
	beforeEach(() => {
		jest.spyOn<any, any>(replace, 'sync').mockReturnValue([]);
	});

	it('should run replaceCreateRequestFunction on init when node env var RUN_REPLACE_REQUEST_FUNCTION is set', () => {
		process.env.RUN_REPLACE_REQUEST_FUNCTION = 'true';

		expect(() => {
			require('../../../utils/replace-create-request-function');
		}).not.toThrow();
	});

	describe('replaceCreateRequestFunction', () => {
		it('should run without error', () => {
			expect(() => {
				replaceCreateRequestFunction();
			}).not.toThrow('');
		});
	});
});
