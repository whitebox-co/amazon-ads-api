import fs from 'fs';
import path from 'path';
import axios from 'axios';
import yaml from 'js-yaml';
import { kebabSchemaName } from './util';
import { SCHEMAS, PATHS, Schema } from '../src/constants';

const deleteOldSchemas = () => {
	fs.rmSync(PATHS.SCHEMAS, { recursive: true, force: true, maxRetries: 2 });
	fs.mkdirSync(PATHS.SCHEMAS);
};

const processYamlSchemaFile = (file: string, data: any) => {
	const { name } = path.parse(file);
	const yamlFilePath = `${PATHS.SCHEMAS}/${file}`;
	const jsonFilePath = `${PATHS.SCHEMAS}/${name}.json`;

	// write initial yaml file
	fs.writeFileSync(yamlFilePath, data);

	// transform to json file
	const schemaFileJson = yaml.load(fs.readFileSync(yamlFilePath, 'utf8'));
	fs.writeFileSync(jsonFilePath, JSON.stringify(schemaFileJson, null, 2));

	// delete yaml file
	fs.rmSync(yamlFilePath);
};

/**
 * Saves the downloaded file to ./docs/schemas/name. If schema is a yaml format it gets transformed to json format.
 * @param schema {name, schemaUrl}
 * @param data
 */
const saveSchemaFile = (schema: Schema, data: any) => {
	const schemaExtension = schema.schemaUrl.slice(schema.schemaUrl.length - 4, schema.schemaUrl.length);

	const fileName = kebabSchemaName(schema.name, schemaExtension);

	if (schemaExtension === 'yaml') {
		processYamlSchemaFile(fileName, data);
	} else {
		fs.writeFileSync(`${PATHS.SCHEMAS}/${fileName}`, JSON.stringify(data, null, 2));
	}
};

/**
 * Generates a schema mapping file in ./docs with an array containing an entry for each resource {name, url}
 */
const createSchemaDocsMapping = () => {
	const schemaMap = SCHEMAS.map((schema) => {
		const schemaFolder = schema.schemaUrl?.length === 0 ? 'custom-schemas' : 'schemas';
		return {
			name: schema.name,
			url: `./${schemaFolder}/${kebabSchemaName(schema.name, 'json')}`,
		};
	});

	const data = `const schemas = ${JSON.stringify(schemaMap, null, 2)}`;
	fs.writeFileSync(PATHS.SCHEMAS_DOCS, data, 'utf8');
};

const downloadSchemas = async () => {
	deleteOldSchemas();

	const schemaDownloadRequests = SCHEMAS.map((schema) => {
		return axios({
			method: 'GET',
			url: schema.schemaUrl,
		});
	});

	const schemaDownloadResponses = await Promise.allSettled(schemaDownloadRequests);

	schemaDownloadResponses.forEach((res, index) => {
		if (res.status === 'fulfilled') {
			saveSchemaFile(SCHEMAS[index], res.value.data);
		} else {
			// console.error(res.reason);
		}
	});

	createSchemaDocsMapping();
};

// Immediately download if told to do so (used in package scripts mostly)
if (process.env.RUN_SCHEMA_DOWNLOADER) {
	downloadSchemas();
}

export { downloadSchemas };
