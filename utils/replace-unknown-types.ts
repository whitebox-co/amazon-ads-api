import replace from 'replace-in-file';

/**
 * Iterates through all generated files and changes the `UNKNOWN_BASE_TYPE` to an `any` type.
 * For some odd reason the openapi-generator is adding this instead of an `any` type. In
 * doing so this causes linting to fail. At some point we need to figure out why this is
 * happening so that we don't have to do this extra step.
 */
const replaceUnknownTypes = (): void => {
	replace.sync({
		files: './src/apis/models/*.ts',
		from: /UNKNOWN_BASE_TYPE/g,
		to: 'any',
	});
};

// Immediately run if told to do so (used in package scripts mostly)
if (process.env.RUN_REPLACE_UNKNOWNS) {
	replaceUnknownTypes();
}

export { replaceUnknownTypes };
