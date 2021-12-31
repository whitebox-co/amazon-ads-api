import fs from 'fs';
import { downloadSchemas } from './schema-downloader';
import gitChangedFiles from 'git-changed-files';

const checkForChanges = async () => {
	let hasChanges = false;

	try {
		await downloadSchemas();

		const { unCommittedFiles } = await gitChangedFiles({
			baseBranch: 'develop',
			formats: ['*.json', '*.yaml'],
			showCommitted: false,
			showUnCommitted: true,
		});
		hasChanges = unCommittedFiles.length > 0;
	} catch (err) {
		hasChanges = false;
	}

	fs.writeFileSync('hasChanges.txt', (hasChanges ? 1 : 0).toString());
};

// Immediately run if told to do so (used in package scripts mostly)
if (process.env.RUN_CHECK_FOR_CHANGES) {
	checkForChanges();
}

export { checkForChanges };
