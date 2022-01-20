/**
 * The main module responsible for kicking off the entire sdk auto generation process.
 *
 * - Downloads OpenAPI Schemas from Amazon Ads A.PI
 * - Generates all of the model Apis.
 * - Generates all of the Clients.
 * - Generates stubbed based integration tests.
 * - Replaces all instances of `UNKNOWN_BASE_TYPE` with `any` type.
 */

import { downloadSchemas } from './schema-downloader';
import { processSchemas } from './model-generator';
import { generateAPIClients } from './client-generator';
import { generateTests } from './test-generator';
import { replaceUnknownTypes } from './replace-unknown-types';

const generateApis = async () => {
	await downloadSchemas();
	processSchemas();
	generateAPIClients();
	generateTests();
	replaceUnknownTypes();
};

// Immediately run if told to do so (used in package scripts mostly)
if (process.env.RUN_API_GENERATOR) {
	generateApis();
}

export { generateApis };
