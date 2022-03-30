import fs from 'fs';
import axios from 'axios';

import { PATHS } from '../../../src/constants';
import { downloadSchemas } from '../../../utils/schema-downloader';

jest.mock('fs');
jest.mock('axios');
jest.mock('js-yaml');

describe('schema-downloader', () => {
	it('should run downloadSchemas on init when node env var RUN_SCHEMA_DOWNLOADER is set', () => {
		jest.resetModules();

		process.env.RUN_SCHEMA_DOWNLOADER = 'true';

		expect(() => {
			require('../../../utils/schema-downloader');
		}).not.toThrow();
	});

	describe('deleteOldSchemas', () => {
		beforeEach(() => {
			jest.spyOn<any, any>(axios, 'get').mockResolvedValue({ data: '{}' });
		});

		it('should remove old schema directory', async () => {
			jest.spyOn<any, any>(fs, 'rmSync');

			await downloadSchemas();

			expect(fs.rmSync).nthCalledWith(1, PATHS.SCHEMAS, {
				force: true,
				maxRetries: 2,
				recursive: true,
			});
		});

		it('should create a new schema directory', async () => {
			jest.spyOn<any, any>(fs, 'rmSync');
			jest.spyOn<any, any>(fs, 'mkdirSync');

			await downloadSchemas();

			expect(fs.mkdirSync).nthCalledWith(1, PATHS.SCHEMAS);
		});
	});

	describe('processYamlSchemaFile', () => {
		beforeEach(() => {
			jest.spyOn<any, any>(axios, 'get').mockResolvedValue({ data: '{}' });
		});

		it('should write the initial yaml file', async () => {
			jest.spyOn<any, any>(fs, 'writeFileSync');

			await downloadSchemas();

			expect(fs.writeFileSync).nthCalledWith(1, './docs/schemas/authorization-profiles.yaml', '{}');
		});

		it('should load and transform the yaml file to a new json file', async () => {
			jest.spyOn<any, any>(fs, 'writeFileSync');

			await downloadSchemas();

			expect(fs.writeFileSync).nthCalledWith(2, './docs/schemas/authorization-profiles.json', undefined);
		});

		it('should delete the original yaml file', async () => {
			jest.spyOn<any, any>(fs, 'rmSync');

			await downloadSchemas();

			expect(fs.rmSync).nthCalledWith(2, './docs/schemas/authorization-profiles.yaml');
		});
	});

	describe('saveSchemaFile', () => {
		beforeEach(() => {
			jest.spyOn<any, any>(fs, 'writeFileSync');
			jest.spyOn<any, any>(axios, 'get').mockResolvedValue({ data: '{}' });
		});

		it('should save a json schema file to the filesystem', async () => {
			await downloadSchemas();

			expect(fs.writeFileSync).nthCalledWith(2, './docs/schemas/authorization-profiles.json', undefined);
			expect(fs.writeFileSync).nthCalledWith(3, './docs/schemas/authorization-manager-account.json', '"{}"');
		});

		it('should transform a yaml file and then save a json schema file to the filesystem', async () => {
			await downloadSchemas();

			expect(fs.writeFileSync).nthCalledWith(1, './docs/schemas/authorization-profiles.yaml', '{}');
			expect(fs.writeFileSync).nthCalledWith(2, './docs/schemas/authorization-profiles.json', undefined);
		});
	});

	describe('createSchemaDocsMapping', () => {
		beforeEach(() => {
			jest.spyOn<any, any>(fs, 'writeFileSync');
			jest.spyOn<any, any>(axios, 'get').mockResolvedValue({ data: '{}' });
		});

		it('should generate a schemas.js json file', async () => {
			await downloadSchemas();

			expect(fs.writeFileSync).nthCalledWith(38, PATHS.SCHEMAS_DOCS, expect.anything(), 'utf8');
		});
	});

	describe('downloadSchemas', () => {
		beforeEach(() => {
			jest.spyOn<any, any>(fs, 'writeFileSync');
			jest.spyOn<any, any>(axios, 'get').mockResolvedValue({ data: '{}' });
		});

		it('should create a json schema for each item in the SCHEMAS array', async () => {
			await downloadSchemas();

			// 37 times includes json, yaml, and schema.js writes.
			expect(fs.writeFileSync).toBeCalledTimes(38);
		});
	});
});
