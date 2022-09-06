import child_process from 'child_process';
import chalk from 'chalk';

function runCommand(cmd) {
  if (cmd.indexOf('vue') > -1) {
    child_process.execSync(cmd, { stdio: 'inherit' });
  } else {
    try {
      return child_process.execSync(cmd).toString();
    } catch (error) {
      console.error(chalk.red(`${cmd} failed`));
    }
  }
}

export default runCommand;
