import child_process from 'child_process';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';

import runCommand from './runCommand.js';
import libs from './libs.js';

const copyFile = (filePath, targetPath = './') => {
  const fileName = path.basename(filePath);
  console.log(chalk.gray(`Copying ${ fileName }`));
  try {
    if (fs.existsSync(filePath)) {
      fs.copyFileSync(filePath, path.resolve(targetPath, fileName));
    } else {
      console.log(`Error: ${ filePath } doesn't exist`);
    }
  } catch(err) {
    console.log(`Error copying ${ filePath }`);
    console.error(err);
  }
};


const copySetupFiles = (opts, processArgv) => {

  if (opts.folderStructure) {
    console.log(chalk.yellow(`Generating frontend folder structure`));
    fs.mkdirSync(path.resolve(process.cwd(), 'frontend'));
    fs.mkdirSync(path.resolve(process.cwd(), 'frontend/fonts'));
    fs.mkdirSync(path.resolve(process.cwd(), 'frontend/js'));

    if (opts.installingBehaviors) {
      console.log(chalk.yellow(`Generating A17-behaviors file and folder structure`));
      fs.mkdirSync(path.resolve(process.cwd(), 'frontend/js/behaviors'));
      fs.mkdirSync(path.resolve(process.cwd(), 'frontend/js/helpers'));
      copyFile(path.resolve(processArgv[1], '../../behaviors/application.js'), 'frontend/js/');
      copyFile(path.resolve(processArgv[1], '../../behaviors/index.js'), 'frontend/js/behaviors');
      copyFile(path.resolve(processArgv[1], '../../behaviors/myBehavior.js'), 'frontend/js/behaviors');
    }
  }

  if (opts.webpack) {
    console.log(chalk.yellow(`Copying Webpack setup files`));
    copyFile(path.resolve(processArgv[1], '../../webpack/webpack.common.js'));
    copyFile(path.resolve(processArgv[1], '../../webpack/webpack.dev.js'));
    copyFile(path.resolve(processArgv[1], '../../webpack/webpack.prod.js'));
  }

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
