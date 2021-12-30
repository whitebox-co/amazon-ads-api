import tsMorph from 'ts-morph';
import { generateAPIClients } from '../../../utils/client-generator';

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
	it('should run generateAPIClients on init when node env var RUN_API_GENERATOR is set', () => {
		jest.resetModules();

		process.env.RUN_CLIENT_GENERATOR = 'true';

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
			generateAPIClients();
		}).toThrow('');
	});

	it('should throw error if sourceFile is returned as undefined', () => {
		jest.spyOn<any, any>(tsMorph, 'Project').mockImplementationOnce(() => {
			return {
				getSourceFileOrThrow: jest.fn(),
			};
		});

		expect(() => {
			generateAPIClients();
		}).toThrow('');
	});

	it('should generate export statements without failing', () => {
		expect(() => {
			generateAPIClients();
		}).not.toThrow('');
	});
});
