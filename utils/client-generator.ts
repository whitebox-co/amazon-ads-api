import { template, TemplateExecutor } from 'lodash';
import { Project } from 'ts-morph';
import { SCHEMAS, PATHS } from '../src/constants';
import { apiClientTemplate } from './client-template';
import { kebabSchemaName, generateAPIClientFileName, generateAPIClientClassname } from './util';

/**
 * Generates a single `client.ts` for each of the schemas. Extends the main class with
 * all of the class apis that are part of the model file.
 *
 * @param project
 * @param executor
 * @param schemaName
 */
const generateAPIClient = (project: Project, executor: TemplateExecutor, schemaName: string) => {
	const apiClientFileName = generateAPIClientFileName(schemaName);
	const apiClientClassName = generateAPIClientClassname(apiClientFileName);

	// Find main api class
	const sourceFile = project.getSourceFileOrThrow(`${PATHS.MODELS}/${kebabSchemaName(schemaName, 'ts')}`);

	// Get all other api classes
	const apiClasses = sourceFile.getClasses().filter((c) => c.getNameOrThrow().includes('Api'));

	let extendable = '';
	const helpers = [];
	const extendedClassNames = apiClasses.map((c) => c.getNameOrThrow()).join(',');

	// apply Mixins for api models that have multiple API classes
	if (apiClasses.length > 1) {
		extendable = `
    export interface ${apiClientClassName} extends ${extendedClassNames} {}
    applyMixins(${apiClientClassName}, [${extendedClassNames}])
    `;

		helpers.push('applyMixins');
	}

	const compiledFile = executor({
		importApiModelClassName: extendedClassNames,
		importHelpers: helpers.join(','),
		dirname: kebabSchemaName(schemaName),
		apiModelClassName: apiClasses[0]?.getNameOrThrow(),
		apiClientClassName,
		extendable,
	});

	project.createSourceFile(`${PATHS.CLIENTS}/${apiClientFileName}.ts`, compiledFile, {
		overwrite: true,
	});
};

/**
 * Creates an index.ts file with all of the client files as exports.
 *
 * @param project
 */
const generateExportStatements = (project: Project) => {
	const compileExportStatement = template(`export * from './<%= apiClientFileName %>';`);

	const exportStatements = SCHEMAS.map((schema) =>
		compileExportStatement({
			apiClientFileName: generateAPIClientFileName(schema.name),
		})
	);

	project.createSourceFile(`${PATHS.CLIENTS}/index.ts`, exportStatements.join('\n'), {
		overwrite: true,
	});
};

/**
 * Loops through all of the schemas defined in the constants and generates
 * api client files for each of the schemas.
 */
const generateAPIClients = () => {
	const compiledClientTemplate = template(apiClientTemplate);

	const project = new Project({
		tsConfigFilePath: './tsconfig.json',
	});

	for (const { name } of SCHEMAS) {
		generateAPIClient(project, compiledClientTemplate, name);
	}

	generateExportStatements(project);
	project.saveSync();
};

// Immediately run if told to do so (used in package scripts mostly)
if (process.env.RUN_CLIENT_GENERATOR) {
	generateAPIClients();
}

export { generateAPIClients };
