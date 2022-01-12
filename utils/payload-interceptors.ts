import fs from 'fs';
import { AmazonAdsApi } from '../src/constants';

const writeDataToFile = (outputPath: string, data: any) => {
	const stringifiedConfig = JSON.stringify(data, null, 2);
	fs.writeFileSync(outputPath, stringifiedConfig);
};

const getOutputPath = (outputFileName: string) => {
	const baseOutputPath = 'docs/testing/integration/payloads';
	return `${baseOutputPath}/methods/${outputFileName.replace(/\s/g, '_')}`;
};

/**
 * Adds response interceptor to save response for testing verification.
 * Files can be found in docs/testing/integration/payloads/methods
 * @param {string} outputFileName The name of the file to output
 * @returns {number} interceptor id
 */
const addInterceptor = <T extends AmazonAdsApi>(client: T, outputFileName: string) => {
	const outputPath = getOutputPath(outputFileName);

	return client['axios'].interceptors.response.use(
		(response: any) => {
			const outputData = {
				...response,
			};
			delete outputData.request;

			writeDataToFile(`${outputPath}.json`, outputData);
			return response;
		},
		(error: any) => {
			writeDataToFile(`${outputPath}.json`, error);

			return Promise.reject(error);
		}
	);
};

/**
<<<<<<< HEAD
 * remove initialized request and response interceptor
 */
const removeInterceptor = <T extends AmazonAdsApi>(client: T, interceptorId: number) => {
	client['axios'].interceptors.response.eject(interceptorId);
};

export { addInterceptor, removeInterceptor };
