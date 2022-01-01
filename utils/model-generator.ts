import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { PATHS } from '../src/constants';

const commonApiFiles: string[] = ['base.ts', 'common.ts', 'configuration.ts'];

/**
 * Uses child process to execute the `openapi-generator-cli` to generate typescript
 * interfaces, and class apis based on the downloaded open api schema.
 *
 * @param schemaFilePath
 * @param schemaFileName
 */
const execOpenApiGenerator = (schemaFilePath: string, schemaFileName: string) => {
	const apiOutputFile = `${PATHS.APIS}/${schemaFileName.slice(0, schemaFileName.length - 5)}`;

	const command = `openapi-generator-cli generate -g typescript-axios --enable-post-process-file --additional-properties=supportES6=true,useSingleRequestParameter=true --type-mappings=set=Array --skip-validate-spec -o ${apiOutputFile} -i ${schemaFilePath}`;

	process.env.TS_POST_PROCESS_FILE = `${PATHS.PRETTIER} --write`;

	if (process.env.VERBOSE_GENERATION) {
		execSync(command, {
			stdio: 'inherit',
		});
	} else {
		execSync(command);
	}
};

/**
 * Move the generated api file to the models directory.
 *
 * @param schemaName
 */
const moveApiModelFile = (schemaName: string) => {
	const oldPath = `${PATHS.APIS}/${schemaName}/api.ts`;
	const newPath = `${PATHS.APIS}/models/${schemaName}.ts`;
	fs.renameSync(oldPath, newPath);
};

/**
 * Cleanup all of the old generated files by deleting the directories of each.
 *
 * @param schemaName
 */
const deleteGeneratedDirectory = (schemaName: string) => {
	const oldPath = `${PATHS.APIS}/${schemaName}`;
	fs.rmSync(oldPath, { recursive: true, force: true, maxRetries: 3 });
};

/**
 * Copies common, base, configuration, from the auto generated files
 * over to the models folder.
 *
 * @param schemaName
 */
const copyCommonFiles = (schemaName: string) => {
	commonApiFiles.forEach((file) => {
		const oldPath = `${PATHS.APIS}/${schemaName}/${file}`;
		const newPath = `${PATHS.APIS}/models/${file}`;
		fs.renameSync(oldPath, newPath);
	});
};

/**
 * Processes a single schema.
 * - Executes the open api generator
 * - Copies common generated files.
 * - Moves generated api file.
 * - Deletes the generated directory.
 *
 * @param schemaFilePath
 * @param schemaFileName
 * @param index
 */
const processSingleSchema = (schemaFilePath: string, schemaFileName: string, index: number) => {
	if (schemaFileName.includes('.json')) {
		const schemaName = path.parse(schemaFileName).name;
		execOpenApiGenerator(schemaFilePath, schemaFileName);

		if (index === 0) {
			copyCommonFiles(schemaName);
		}

		moveApiModelFile(schemaName);
		deleteGeneratedDirectory(schemaName);
	}
};

/**
 * Loops through all of the schemas defined in the constants and generates
 * models for each of them.
 */
const processSchemas = () => {
	const schemaFileNames = fs.readdirSync(PATHS.SCHEMAS);
	const customSchemaFileNames = fs.readdirSync(PATHS.CUSTOM_SCHEMAS);

	schemaFileNames.map((fileName, index) => {
		const filePath = path.join(PATHS.SCHEMAS, fileName);
		processSingleSchema(filePath, fileName, index);
	});

	customSchemaFileNames.map((fileName, index) => {
		const filePath = path.join(PATHS.CUSTOM_SCHEMAS, fileName);
		processSingleSchema(filePath, fileName, index);
	});
};

// Immediately run if told to do so (used in package scripts mostly)
if (process.env.RUN_MODEL_GENERATOR) {
	processSchemas();
}

export { processSchemas };
