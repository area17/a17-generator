import child_process from 'child_process';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import runCommand from './runCommand.js';
import generateWebpackConfig from './generateWebpackConfig.js';
import generateReadme from './generateReadme.js';
import libs from './libs.js';

const generatorPath = path.resolve(dirname(fileURLToPath(import.meta.url)), '../');

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


const copySetupFiles = (opts, appName) => {
  const folderStructurePrefix = opts.installing.laravel ? 'resources/' : '';

  if (opts.installing.folderStructure) {
    console.log(chalk.yellow(`Generating frontend folder structure`));
    if (opts.installing.laravel) {
      fs.mkdirSync(path.resolve(process.cwd(), 'resources'));
    }
    fs.mkdirSync(path.resolve(process.cwd(), `${ folderStructurePrefix }frontend`));
    fs.mkdirSync(path.resolve(process.cwd(), `${ folderStructurePrefix }frontend/fonts`));
    fs.mkdirSync(path.resolve(process.cwd(), `${ folderStructurePrefix }frontend/js`));

    if (opts.installing.scssUtilities) {
      fs.mkdirSync(path.resolve(process.cwd(), `${ folderStructurePrefix }frontend/scss`));
    }

    if (opts.installing.tailwindPlugins) {
      fs.mkdirSync(path.resolve(process.cwd(), `${ folderStructurePrefix }frontend/css`));
    }

    if (opts.installing.behaviors) {
      console.log(chalk.yellow(`Generating A17-behaviors file and folder structure`));
      fs.mkdirSync(path.resolve(process.cwd(), `${ folderStructurePrefix }frontend/js/behaviors`));
      fs.mkdirSync(path.resolve(process.cwd(), `${ folderStructurePrefix }frontend/js/helpers`));
      copyFile(path.resolve(generatorPath, 'core_files/behaviors/application.js'), `${ folderStructurePrefix }frontend/js/`);
      copyFile(path.resolve(generatorPath, 'core_files/behaviors/index.js'), `${ folderStructurePrefix }frontend/js/behaviors`);
      copyFile(path.resolve(generatorPath, 'core_files/behaviors/myBehavior.js'), `${ folderStructurePrefix }frontend/js/behaviors`);
    }
  }

  if (opts.installing.webpack) {
    console.log(chalk.yellow(`Setting up Webpack`));
    console.log(chalk.gray(`Generating Webpack config file`));
    const webpackConfig = generateWebpackConfig(opts, generatorPath);
    console.log(chalk.gray(`Writing Webpack config file`));
    fs.writeFileSync(path.resolve(process.cwd(), 'webpack.config.js'), webpackConfig, { encoding: "utf8" });

    console.log(chalk.gray(`Set up default index file`));
    fs.mkdirSync(path.resolve(process.cwd(), 'public'));
    copyFile(path.resolve(generatorPath, 'core_files/webpack/index.html'), 'public');

    if (!opts.installing.behaviors) {
      console.log(chalk.gray(`Generating empty application.js`));
      fs.ensureFileSync(path.resolve(process.cwd(), `${ folderStructurePrefix }frontend/js/application.js`));
    }

    if (opts.installing.scssUtilities) {
      copyFile(path.resolve(generatorPath, 'core_files/scssUtilities/frontend.config.json'), `${ folderStructurePrefix }frontend`);
    }
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
      fs.copySync(path.resolve(generatorPath, 'core_files/dot_files'), process.cwd(), { overwrite: false })
      console.log(chalk.yellow(`dot files added`));
    } catch (err) {
      console.log(chalk.red(`Adding dot files failed`));
      console.error(err);
    }
  }

  if (opts.lintFiles) {
    try {
      fs.copySync(path.resolve(generatorPath, 'core_files/lintconfigs'), process.cwd(), { overwrite: false })
      console.log(chalk.yellow(`Lint setup dot files added`));
    } catch (err) {
      console.log(chalk.red(`Adding lint setup dot files failed`));
      console.error(err);
    }
  }

  if (opts.installing.preCommitHook) {
    if (fs.existsSync('.git')) {
      console.log(chalk.yellow(`Set up pre-commit hook (Husky)`));
      runCommand(`npx Husky install`);
      if (!fs.existsSync('package.json')) {
        console.log(chalk.gray(`warn user no package.json - will need to manually add Husky prepare script`));
      }
      runCommand(`npx husky add .husky/pre-commit "npm run lint:staged"`);
      console.log(chalk.gray(`pre-commit hook added`));
      runCommand(`git add .husky/pre-commit`);
      runCommand(`git commit -m "adds husky pre-commit hook" --no-verify`);
      console.log(chalk.gray(`Committing .husky/pre-commit`));
    } else {
      console.log(chalk.gray(`warn user git not initiated - will need to set up Husky`));
    }
  }

  if (opts.readme) {
    console.log(chalk.yellow(`Generating README.md`));
    const readme = generateReadme(opts, process, appName);
    console.log(chalk.gray(`Writing README.md`));
    fs.writeFileSync(path.resolve(process.cwd(), 'README.md'), readme, { encoding: "utf8" });
  }

  if (opts.styling > -1) {
    const selectedStyling = libs.styling[opts.styling];
    if (selectedStyling.files && selectedStyling.files.length) {
      console.log(chalk.yellow(`Copy ${ selectedStyling.name } set up files`));
      const targetPath = opts.installing.folderStructure ? `${ folderStructurePrefix }frontend` : './';
      selectedStyling.files.forEach(file => {
        copyFile(file, targetPath);
      });
    }

    if (opts.installing.scssUtilities) {
      console.log(chalk.gray(`Adding an application.scss file`));
      fs.ensureDirSync(`${ folderStructurePrefix }frontend/scss`);
      copyFile(path.resolve(generatorPath, 'core_files/scssUtilities/application.scss'), `${ folderStructurePrefix }frontend/scss`);
    }

    if (opts.installing.tailwindPlugins) {
      console.log(chalk.gray(`Adding an application.css file`));
      fs.copySync(path.resolve(generatorPath, 'core_files/tailwindPlugins'), `${ folderStructurePrefix }frontend/css`, { overwrite: false });
      console.log(chalk.gray(`Update tailwind plugin require`));
      let tailwindConfig = fs.readFileSync(`${ folderStructurePrefix }frontend/tailwind.config.js`, { encoding:'utf8' } );
      tailwindConfig = tailwindConfig.replace(/require\('\.\.\/index'\)/, `require('@area17/a17-tailwind-plugins')`);
      fs.writeFileSync(`${ folderStructurePrefix }frontend/tailwind.config.js`, tailwindConfig, { encoding: "utf8" });
    }
  }

  if (opts.installing.svgsprite) {
    console.log(chalk.yellow(`Setting up SVG sprite`));
    console.log(chalk.gray(`Adding test SVG file`));
    fs.ensureDirSync(`${ folderStructurePrefix }frontend/svg`);
    copyFile(path.resolve(generatorPath, 'core_files/svgsprite/test.svg'), `${ folderStructurePrefix }frontend/svg`);
    console.log(chalk.gray(`Generating placeholder sprite.css file`));
    if (opts.installing.scssUtilities) {
      fs.ensureDirSync(`${ folderStructurePrefix }frontend/scss`);
      try {
        fs.writeFileSync(`${ folderStructurePrefix }frontend/scss/sprite.css`, '');
      } catch(err) {
        console.log(`Error generating sprite.css`);
        console.error(err);
      }
    } else {
      fs.ensureDirSync(`${ folderStructurePrefix }frontend/css`);
      try {
        fs.writeFileSync(`${ folderStructurePrefix }frontend/css/sprite.css`, '');
      } catch(err) {
        console.log(`Error generating sprite.css`);
        console.error(err);
      }
    }

    if (opts.installing.scssUtilities) {
      console.log(chalk.gray(`Linking placeholder sprite.css file inside application.scss`));
      let applicationScss = fs.readFileSync(`${ folderStructurePrefix }frontend/scss/application.scss`, { encoding:'utf8' } );
      applicationScss += `\n@import 'sprite';`;
      fs.writeFileSync(`${ folderStructurePrefix }frontend/scss/application.scss`, applicationScss, { encoding: "utf8" });
    }

    if (opts.installing.tailwindPlugins) {
      console.log(chalk.gray(`Linking placeholder sprite.css file inside tailwind base.css`));
      let baseCss = fs.readFileSync(`${ folderStructurePrefix }frontend/css/_base.css`, { encoding:'utf8' } );
      baseCss += `\n@import 'sprite';`;
      fs.writeFileSync(`${ folderStructurePrefix }frontend/css/_base.css`, baseCss, { encoding: "utf8" });
    }
  }

};

export default copySetupFiles;
