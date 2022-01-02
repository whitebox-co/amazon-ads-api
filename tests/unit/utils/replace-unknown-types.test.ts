import replace from 'replace-in-file';

import { replaceUnknownTypes } from '../../../utils/replace-unknown-types';

jest.mock('replace-in-file');

describe('replace-unknown-types', () => {
	beforeEach(() => {
		jest.spyOn<any, any>(replace, 'sync').mockReturnValue([]);
	});

	it('should run replaceUnknownTypes on init when node env var RUN_REPLACE_UNKNOWNS is set', () => {
		process.env.RUN_REPLACE_UNKNOWNS = 'true';

		expect(() => {
			require('../../../utils/replace-unknown-types');
		}).not.toThrow();
	});

	describe('replaceUnknownTypes', () => {
		it('should run without error', () => {
			expect(() => {
				replaceUnknownTypes();
			}).not.toThrow('');
		});
	});
});
