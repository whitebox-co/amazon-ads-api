import { kebabCase, upperFirst, camelCase } from 'lodash';
import Pino from 'pino';

export const kebabSchemaName = (name: string, ext?: string): string =>
	ext ? `${kebabCase(name)}.${ext}` : kebabCase(name);

export const generateAPIClientFileName = (schemaName: string): string => kebabSchemaName(`${schemaName} client`);

export const generateAPIClientClassname = (apiClientFileName: string): string =>
	upperFirst(camelCase(apiClientFileName));

export const logger = Pino({
	name: '@whitebox-co/amazon-ads-api-logger',
});
