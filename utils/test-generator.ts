import { template } from 'lodash';
import { Project } from 'ts-morph';
import fs from 'fs';
import _ from 'lodash';

import { SCHEMAS, PATHS } from '../src/constants';
import { integrationTestTemplate } from './integration-test-template';
import { kebabSchemaName, generateAPIClientFileName, generateAPIClientClassname } from '../utils/util';

/**
 * Generates Integration test stubs based on API function names.
 *
 * @param {string} schemaName
 */
const generateIntegrationTest = (schemaName: string) => {
	const sourceFile = new Project({
		tsConfigFilePath: PATHS.TS_CONFIG,
		libFolderPath: PATHS.TS_LIB,
	}).getSourceFileOrThrow(`${PATHS.APIS}/clients/${schemaName}.ts`);

	if (!sourceFile) {
		throw new Error('Can not generate integration test. Source file not found!');
	}

	const integrationTestFilePath = `${PATHS.INTEGRATION_TESTS}/clients/${schemaName}.spec.ts`;

	// skip stubbing if there is already an existing integration test file
	if (!fs.existsSync(integrationTestFilePath)) {
		const classes = sourceFile.getClasses();

		// get method names mapped to class names.
		[...classes].forEach((declaration) => {
			const className = declaration.getName();
			const instanceMethods = declaration.getInstanceMethods();

			const formattedMethodNames = [...instanceMethods].map((declaration) => {
				return `#${declaration.getName()}`;
			});

			// create a ts project to output our compiled template.
			const integrationTestProject = new Project({
				tsConfigFilePath: PATHS.TS_CONFIG,
				libFolderPath: PATHS.TS_LIB,
			});

			// use lodash template to get a template executor so we can compile the test file
			const templateExecuter = template(integrationTestTemplate);

			// run the templateExecuter to compile the file with the parameters injected.
			const compiledFile = templateExecuter({
				apiInstanceName: _.lowerFirst(className),
				apiClassName: className,
				formattedMethodNames,
			});

			// write the file to disk.
			integrationTestProject.createSourceFile(integrationTestFilePath, compiledFile, {
				overwrite: false,
			});

			integrationTestProject.save();
		});
	}
};

/**
 * Loops through all of the schemas defined in the constants and Generates
 * integration tests for each
 */
const generateTests = () => {
	for (const { name } of SCHEMAS) {
		const apiClientFileName = generateAPIClientFileName(name);
		const apiClientClassName = generateAPIClientClassname(apiClientFileName);

		generateIntegrationTest(kebabSchemaName(apiClientClassName));
	}
};

// Immediately run if told to do so (used in package scripts mostly)
if (process.env.RUN_TEST_GENERATOR) {
	generateTests();
}

export { generateTests };
