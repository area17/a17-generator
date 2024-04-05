import chalk from 'chalk';

const nodeVersion = (cmd) => {
  console.log(chalk.cyan(`\nChecking Node version`));
  let [nodeMajor, nodeMinor, nodePatch] = process.versions.node.split('.').map(Number);
  if (nodeMajor < 20 || (nodeMajor >= 20 && nodeMinor < 11)) {
    console.log(`Node version is ${ process.version.match(/^v(\d+\.\d+)/)[1] }, minimum required is 20.11.0`);
    if (nodeMajor < 20 || (nodeMajor >= 20 && nodeMinor < 11)) {
      console.log(chalk.red(`\nNode version is insufficient.\nPlease switch or update to 20.11.0 and re-run A17 Generator.\n\n\n`));
      process.exit(1);
    } else {
      console.log(chalk.green(`Node version is now ${ process.version.match(/^v(\d+\.\d+)/)[1] }`));
    }
  }
}

export default nodeVersion;
