import fs from 'fs';
import childProcess from 'child_process';

import { processSchemas } from '../../../utils/model-generator';

jest.mock('fs');
jest.mock('child_process');

jest.mock('../../../utils/replace-create-request-function');

const schemaFileNames = ['testSchemaOne.json', 'testSchemaTwo.json'];

describe('model-generator', () => {
	beforeEach(() => {
		jest.spyOn<any, any>(fs, 'readdirSync').mockReturnValue(schemaFileNames);
	});

	it('should run processSchemas on init when node env var RUN_MODEL_GENERATOR is set', () => {
		process.env.RUN_MODEL_GENERATOR = 'true';

		expect(() => {
			require('../../../utils/model-generator');
		}).not.toThrow();
	});

	describe('execOpenApiGenerator', () => {
		it('should execute the open api generator without error in non verbose mode', () => {
			jest.spyOn<any, any>(fs, 'writeFileSync');
			jest.spyOn<any, any>(childProcess, 'execSync');

			processSchemas();

			expect(childProcess.execSync).nthCalledWith(
				1,
				'openapi-generator-cli generate -g typescript-axios --enable-post-process-file --additional-properties=supportES6=true,useSingleRequestParameter=true --type-mappings=set=Array --skip-validate-spec -o ./src/apis/testSchemaOne -i docs/schemas/testSchemaOne.json'
			);

			expect(childProcess.execSync).nthCalledWith(
				2,
				'openapi-generator-cli generate -g typescript-axios --enable-post-process-file --additional-properties=supportES6=true,useSingleRequestParameter=true --type-mappings=set=Array --skip-validate-spec -o ./src/apis/testSchemaTwo -i docs/schemas/testSchemaTwo.json'
			);
		});

		it('should execute the open api generator without error in verbose mode', () => {
			process.env.VERBOSE_GENERATION = 'true';

			jest.spyOn<any, any>(fs, 'writeFileSync');
			jest.spyOn<any, any>(childProcess, 'execSync');

			processSchemas();

			expect(childProcess.execSync).nthCalledWith(
				1,
				'openapi-generator-cli generate -g typescript-axios --enable-post-process-file --additional-properties=supportES6=true,useSingleRequestParameter=true --type-mappings=set=Array --skip-validate-spec -o ./src/apis/testSchemaOne -i docs/schemas/testSchemaOne.json',
				{ stdio: 'inherit' }
			);

			expect(childProcess.execSync).nthCalledWith(
				2,
				'openapi-generator-cli generate -g typescript-axios --enable-post-process-file --additional-properties=supportES6=true,useSingleRequestParameter=true --type-mappings=set=Array --skip-validate-spec -o ./src/apis/testSchemaTwo -i docs/schemas/testSchemaTwo.json',
				{ stdio: 'inherit' }
			);
		});
	});

	describe('moveApiModelFile', () => {
		it('should rename the generated api files without error', () => {
			jest.spyOn<any, any>(fs, 'rmSync');

			processSchemas();

			expect(fs.renameSync).nthCalledWith(
				4,
				'./src/apis/testSchemaOne/api.ts',
				'./src/apis/models/testSchemaOne.ts'
			);
			expect(fs.renameSync).nthCalledWith(
				5,
				'./src/apis/testSchemaTwo/api.ts',
				'./src/apis/models/testSchemaTwo.ts'
			);
		});
	});

	describe('deleteGeneratedDirectory', () => {
		it('should remove the generated schema directories without error', () => {
			jest.spyOn<any, any>(fs, 'rmSync');

			processSchemas();

			expect(fs.rmSync).nthCalledWith(1, './src/apis/testSchemaOne', {
				force: true,
				maxRetries: 3,
				recursive: true,
			});

			expect(fs.rmSync).nthCalledWith(2, './src/apis/testSchemaTwo', {
				force: true,
				maxRetries: 3,
				recursive: true,
			});
		});
	});

	describe('copyCommonFiles', () => {
		it('should copy the first generated api common files without error', () => {
			jest.spyOn<any, any>(fs, 'rmSync');

			processSchemas();

			expect(fs.renameSync).nthCalledWith(1, './src/apis/testSchemaOne/base.ts', './src/apis/models/base.ts');
			expect(fs.renameSync).nthCalledWith(2, './src/apis/testSchemaOne/common.ts', './src/apis/models/common.ts');
			expect(fs.renameSync).nthCalledWith(
				3,
				'./src/apis/testSchemaOne/configuration.ts',
				'./src/apis/models/configuration.ts'
			);
		});
	});

	describe('processSingleSchema', () => {
		it('should generate single typescript model from OpenAPI json schema file', () => {
			jest.spyOn<any, any>(fs, 'writeFileSync');
			jest.spyOn<any, any>(childProcess, 'execSync');
			jest.spyOn<any, any>(fs, 'rmSync');

			const schemas = ['testSchemaOne.json'];

			jest.spyOn<any, any>(fs, 'readdirSync').mockReturnValue(schemas);

			processSchemas();

			expect(childProcess.execSync).nthCalledWith(
				1,
				'openapi-generator-cli generate -g typescript-axios --enable-post-process-file --additional-properties=supportES6=true,useSingleRequestParameter=true --type-mappings=set=Array --skip-validate-spec -o ./src/apis/testSchemaOne -i docs/schemas/testSchemaOne.json',
				{ stdio: 'inherit' }
			);

			expect(fs.renameSync).nthCalledWith(
				3,
				'./src/apis/testSchemaOne/configuration.ts',
				'./src/apis/models/configuration.ts'
			);

			expect(fs.renameSync).nthCalledWith(
				4,
				'./src/apis/testSchemaOne/api.ts',
				'./src/apis/models/testSchemaOne.ts'
			);

			expect(fs.rmSync).nthCalledWith(1, './src/apis/testSchemaOne', {
				force: true,
				maxRetries: 3,
				recursive: true,
			});
		});

		it('should only generate typescript model if OpenAPI json schema', () => {
			const schemas = ['testSchemaThree.yaml'];

			jest.spyOn<any, any>(childProcess, 'execSync');
			jest.spyOn<any, any>(fs, 'readdirSync').mockReturnValue(schemas);

			expect(childProcess.execSync).not.toHaveBeenCalled();
		});
	});

	describe('processSchemas', () => {
		it('should process all schemas', () => {
			jest.spyOn<any, any>(fs, 'writeFileSync');
			jest.spyOn<any, any>(childProcess, 'execSync');
			jest.spyOn<any, any>(fs, 'rmSync');

			processSchemas();

			expect(childProcess.execSync).nthCalledWith(
				1,
				'openapi-generator-cli generate -g typescript-axios --enable-post-process-file --additional-properties=supportES6=true,useSingleRequestParameter=true --type-mappings=set=Array --skip-validate-spec -o ./src/apis/testSchemaOne -i docs/schemas/testSchemaOne.json',
				{ stdio: 'inherit' }
			);

			expect(childProcess.execSync).nthCalledWith(
				2,
				'openapi-generator-cli generate -g typescript-axios --enable-post-process-file --additional-properties=supportES6=true,useSingleRequestParameter=true --type-mappings=set=Array --skip-validate-spec -o ./src/apis/testSchemaTwo -i docs/schemas/testSchemaTwo.json',
				{ stdio: 'inherit' }
			);

			expect(fs.renameSync).nthCalledWith(
				3,
				'./src/apis/testSchemaOne/configuration.ts',
				'./src/apis/models/configuration.ts'
			);

			expect(fs.renameSync).nthCalledWith(
				4,
				'./src/apis/testSchemaOne/api.ts',
				'./src/apis/models/testSchemaOne.ts'
			);

			expect(fs.renameSync).nthCalledWith(
				5,
				'./src/apis/testSchemaTwo/api.ts',
				'./src/apis/models/testSchemaTwo.ts'
			);

			expect(fs.rmSync).nthCalledWith(1, './src/apis/testSchemaOne', {
				force: true,
				maxRetries: 3,
				recursive: true,
			});

			expect(fs.rmSync).nthCalledWith(2, './src/apis/testSchemaTwo', {
				force: true,
				maxRetries: 3,
				recursive: true,
			});
		});
	});
});
