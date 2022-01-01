import { kebabCase, upperFirst, camelCase } from 'lodash';

/**
 * Creates a `kebab-name` out of a `CamelName` and optionally appends an extension.
 *
 * @param {string} name
 * @param {string} ext
 * @returns
 */
export const kebabSchemaName = (name: string, ext?: string): string =>
	ext ? `${kebabCase(name)}.${ext}` : kebabCase(name);

/**
 * Takes a schema name like `Brand Metrics` and converts it to a kebab name with the word
 * `client` appended. For Example `Brand Metrics` becomes `brand-metrics-client`.
 *
 * @param {string} schemaName - the original schema filename. ie. `Brand Metrics`.
 * @returns {string} - The new kebab based name. ie. `Brand Metrics Client`.
 */
export const generateAPIClientFileName = (schemaName: string): string => kebabSchemaName(`${schemaName} client`);

/**
 * Takes a kebab based client name like `brand-metrics-client` and converts it to a camel cased
 * class name. For Example `brand-metrics-client` becomes `BrandMetricsClient1
 *
 * @param {string} apiClientFileName - the kebab cased client name. ie. 'brand-metric-client`
 * @returns {string} - the new camel cased client name. ie. `BrandMetricsClient`
 */
export const generateAPIClientClassname = (apiClientFileName: string): string =>
	upperFirst(camelCase(apiClientFileName));
