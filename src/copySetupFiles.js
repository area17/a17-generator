import child_process from 'child_process';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';

import libs from './libs.js';

const copyFile = (filePath) => {
  const fileName = path.basename(filePath);
  console.log(chalk.gray(`\nCopying ${ fileName }`));
  try {
    if (fs.existsSync(filePath)) {
      fs.copyFileSync(filePath, fileName);
    } else {
      console.log(`Error: ${ filePath } doesn't exist`);
    }
  } catch(err) {
    console.log(`Error copying ${ filePath }`);
    console.error(err);
  }
};


const copySetupFiles = (opts, processArgv) => {

  if (opts.nvmrc) {
    if(!fs.existsSync(path.join(process.cwd(),'.nvmrc'))) {
      console.log(chalk.yellow(`Generating .nvmrc file`));
      runCommand('node -v > .nvmrc');
    } else {
      console.log(chalk.gray(`.nvmrc file already exists, skipping generation`));
    }
  }

  if (opts.dotFiles) {
    try {
      fs.copySync(path.resolve(processArgv[1], '../../dot_files'), process.cwd(), { overwrite: false })
      console.log(chalk.yellow(`dot files added`));
    } catch (err) {
      console.log(chalk.red(`Adding dot files failed`));
      console.error(err)
    }
  }

  if (opts.styling > -1) {
    const selectedStyling = libs.styling[opts.styling];
    if (selectedStyling.files.length) {
      console.log(chalk.yellow(`Copy ${ selectedStyling.name } set up files`));
      selectedStyling.files.forEach(file => {
        copyFile(file);
      });
    }
  }

};

export default copySetupFiles;
