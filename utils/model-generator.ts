import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { PATHS } from '../src/constants';

const commonApiFiles: string[] = ['base.ts', 'common.ts', 'configuration.ts'];

const execOpenApiGenerator = (schemaFilePath: string, schemaFileName: string) => {
	const apiOutputFile = `${PATHS.APIS}/${schemaFileName.slice(0, schemaFileName.length - 5)}`;

	const command = `openapi-generator-cli generate -g typescript-axios --enable-post-process-file --additional-properties=supportES6=true,useSingleRequestParameter=true --type-mappings=set=Array --skip-validate-spec -o ${apiOutputFile} -i ${schemaFilePath}`;
	execSync(command);
};

const moveApiModelFile = (schemaName: string) => {
	const oldPath = `${PATHS.APIS}/${schemaName}/api.ts`;
	const newPath = `${PATHS.APIS}/models/${schemaName}.ts`;
	fs.renameSync(oldPath, newPath);
};

const deleteGeneratedDirectory = (schemaName: string) => {
	const oldPath = `${PATHS.APIS}/${schemaName}`;
	fs.rmSync(oldPath, { recursive: true, force: true, maxRetries: 3 });
};

const copyCommonFiles = (schemaName: string) => {
	commonApiFiles.forEach((file) => {
		const oldPath = `${PATHS.APIS}/${schemaName}/${file}`;
		const newPath = `${PATHS.APIS}/models/${file}`;
		fs.renameSync(oldPath, newPath);
	});
};

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
