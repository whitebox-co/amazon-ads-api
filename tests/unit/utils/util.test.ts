import { kebabSchemaName, generateAPIClientFileName, generateAPIClientClassname } from '../../../utils/util';

describe('util', () => {
	describe('kebabSchemaName', () => {
		it('should return a kebab cased name without an extension', () => {
			const expectedKebabCasedName = 'kebab-test-name';

			const kebabCasedName = kebabSchemaName('Kebab Test Name');

			expect(kebabCasedName).toEqual(expectedKebabCasedName);
		});

		it('should return a kebab cased name with an extension', () => {
			const expectedKebabCasedName = 'kebab-test-name.json';

			const kebabCasedName = kebabSchemaName('Kebab Test Name', 'json');

			expect(kebabCasedName).toEqual(expectedKebabCasedName);
		});
	});

	describe('generateAPIClientFileName', () => {
		it('should return a kebab-cased filename with client appended', () => {
			const expectedKebabCasedName = 'kebab-test-client';

			const kebabCasedName = generateAPIClientFileName('Kebab Test');

			expect(kebabCasedName).toEqual(expectedKebabCasedName);
		});
	});

	describe('generateAPIClientClassname', () => {
		it('should return an Upper Cased name from a kebab-name', () => {
			const expectedClassName = 'ClassNameClient';
			const kebabName = 'class-name-client';

			const apiClientClassName = generateAPIClientClassname(kebabName);

			expect(apiClientClassName).toEqual(expectedClassName);
		});
	});
});
