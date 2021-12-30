import { kebabCase, upperFirst, camelCase } from 'lodash';

export const kebabSchemaName = (name: string, ext?: string): string =>
	ext ? `${kebabCase(name)}.${ext}` : kebabCase(name);

export const generateAPIClientFileName = (schemaName: string): string => kebabSchemaName(`${schemaName} client`);

export const generateAPIClientClassname = (apiClientFileName: string): string =>
	upperFirst(camelCase(apiClientFileName));
