import child_process from 'child_process';

function installPackages() {
  // let result = spawn.sync('npm', ['install'], {stdio: 'inherit'});

  // if(result.status === 1) {
  //   console.log(chalk.red('Exit with an error'));
  //   process.exit();
  // } else {
  //   console.log(chalk.green('Packages are successfully installed'));
  // }

  child_process.execSync('npm install @area17/a17-tailwind-plugins',{stdio:[0,1,2]});

  child_process.execSync('npm install @area17/a17-behaviors',{stdio:[0,1,2]});
}

export default installPackages;
