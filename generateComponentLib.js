const Vuedoc = require('@vuedoc/md');
const globby = require('globby');
const fsExtra = require('fs-extra');
const fs = require('fs');
const path = require('path');

const sourceDir = 'node_modules/@hubblecommerce/hubble/core/components';
const targetDir = 'docs/components/generated';

const listAllFilesAndDirs = dir => globby(`${dir}/**/*`);
(async () => {
    // Check if hubble module is installed
    try {
        await fs.promises.access(sourceDir);
    } catch (error) {
        console.log('\x1b[33m%s\x1b[0m', 'Could not find hubble core component directory. Please install hubble-frontend-pwa dependency and try again.');
    }

    // Clear old files of target directory
    await fsExtra.removeSync(targetDir);
    await fs.mkdirSync(targetDir);

    // Generate files from source directory
    const files = await listAllFilesAndDirs(sourceDir);
    files.forEach(file => {
        Vuedoc.md({filename: file})
            .then((document) => {
                const readmeFileName = path.parse(file).base.replace('.vue', '.md')
                fs.writeFileSync(`${targetDir}/${readmeFileName}`, document);
            })
            .catch((err) => console.error(err));
    })
})();
