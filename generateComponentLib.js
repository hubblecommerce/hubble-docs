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
    const files = await listAllFilesAndDirs(sourceDir)

    // for loop will ensure await processing
    // of each individual file will work as aspected.
    // This will improve the review process when one
    // parsing will fail you are able to locate the failing file
    // by looking at the latest console.debug() message.
    for (const file of files) {
        // print currently processed filename to enhance debugging
        console.debug(`Processing '${file}'`)
        // await each processing ensures the process stops
        // at the failing file which will make debugging easier
        await Vuedoc.md({filenames: [file]})
            .then(document => {
                const readmeFileName = path.parse(file).base.replace('.vue', '.md')
                fs.writeFileSync(`${targetDir}/${readmeFileName}`, document);
            })
            .catch((err) => console.error(err));
    }
})();
