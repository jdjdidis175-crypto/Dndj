const readline = require('readline');
const { exec } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter your next terminal bash command here: ', (command) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
    if (stdout) {
      console.log(`stdout:\n${stdout}`);
    }
    rl.close();
  });
});
