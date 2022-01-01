/**
 * The main module responsible for kicking off the entire sdk auto generation process.
 *
 * - Downloads OpenAPI Schemas from Amazon Ads A.PI
 * - Generates all of the model Apis.
 * - Generates all of the Clients.
 * - Generates stubbed based integration tests.
 */

import { downloadSchemas } from './schema-downloader';
import { processSchemas } from './model-generator';
import { generateAPIClients } from './client-generator';
import { generateTests } from './test-generator';

downloadSchemas();
processSchemas();
generateAPIClients();
generateTests();
