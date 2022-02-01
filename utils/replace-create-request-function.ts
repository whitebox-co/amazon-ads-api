import replace from 'replace-in-file';
import { Project } from 'ts-morph';
import { PATHS, SCHEMAS } from '../src/constants';
import { kebabSchemaName } from './util';

/**
 * Iterates through all generated models, removes the `createRequestFunction` from the
 * `common` import and injects the `createRequestFunction` from the `helpers` import.
 *
 * This is necessary to provide rate-throttling before `axios.request()` is issued.
 */
const replaceCreateRequestFunction = (): void => {
	replace.sync({
		files: './src/apis/models/*.ts',
		from: /, createRequestFunction/g,
		to: '',
	});

	const project = new Project({
		tsConfigFilePath: './tsconfig.json',
	});

	for (const { name } of SCHEMAS) {
		const modelName = kebabSchemaName(name);
		const sourceFile = project.getSourceFile(`${PATHS.MODELS}/${modelName}.ts`);
		sourceFile.addImportDeclaration({
			defaultImport: '{ createRequestFunction }',
			moduleSpecifier: '../../helpers',
		});
		sourceFile.saveSync();
	}

	project.saveSync();
};

// Immediately run if told to do so (used in package scripts mostly)
if (process.env.RUN_REPLACE_REQUEST_FUNCTION) {
	replaceCreateRequestFunction();
}

export { replaceCreateRequestFunction };
