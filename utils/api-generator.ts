import { downloadSchemas } from './schema-downloader';
import { processSchemas } from './model-generator';
import { generateAPIClients } from './client-generator';
import { generateTests } from './test-generator';

downloadSchemas();
processSchemas();
generateAPIClients();
generateTests();
