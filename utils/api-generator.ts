import { downloadSchemas } from './schema-downloader';
import { processSchemas } from './model-generator';
import { generateAPIClients } from './client-generator';

downloadSchemas();
processSchemas();
generateAPIClients();
