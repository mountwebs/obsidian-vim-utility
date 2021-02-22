const { exec } = require('child_process');

exec("nvim -c 'wq /Users/salt-dev/test.txt'", (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log('noe');
});
