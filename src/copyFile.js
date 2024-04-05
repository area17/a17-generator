import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

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

export default copyFile;
