import tsMorph from 'ts-morph';
import { generateTests } from '../../../utils/test-generator';

jest.mock('ts-morph');
jest.mock('../../../utils/util');

jest.mock('ts-morph', () => {
	return {
		Project: jest.fn().mockImplementation(() => {
			return {
				getSourceFileOrThrow: jest.fn().mockImplementation(() => {
					return {
						getClasses: jest.fn().mockReturnValue([]),
					};
				}),
				createSourceFile: jest.fn(),
				saveSync: jest.fn(),
			};
		}),
	};
});

describe('client-generator', () => {
	it('should run generateTests on init when node env var RUN_TEST_GENERATOR is set', () => {
		jest.resetModules();

		process.env.RUN_TEST_GENERATOR = 'true';

		expect(() => {
			require('../../../utils/client-generator');
		}).not.toThrow();
	});

	it('should throw error if sourceFile is not found or initialized', () => {
		jest.spyOn<any, any>(tsMorph, 'Project').mockImplementationOnce(() => {
			return {
				getSourceFileOrThrow: jest.fn().mockRejectedValueOnce(''),
			};
		});

		expect(() => {
			generateTests();
		}).toThrow('');
	});

	it('should throw error if sourceFile is returned as undefined', () => {
		jest.spyOn<any, any>(tsMorph, 'Project').mockImplementationOnce(() => {
			return {
				getSourceFileOrThrow: jest.fn(),
			};
		});

		expect(() => {
			generateTests();
		}).toThrow('');
	});

	it('should generate tests without failing', () => {
		expect(() => {
			generateTests();
		}).not.toThrow('');
	});
});
