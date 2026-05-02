const { spawn } = require('child_process');
const readline = require('readline');

// Запускаем локальный bash-процесс
const shell = spawn('bash', ['-i']); // -i для интерактивного режима

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

const showPrompt = () => {
    process.stdout.write('\x1b[33menter your next terminal bash command here input > \x1b[0m');
};

// OUTPUT LOGS: Вывод результата выполнения в консоль
shell.stdout.on('data', (data) => {
    console.log(`\n\x1b[32m[CONSOLE LOGS]:\x1b[0m\n${data.toString()}`);
    showPrompt();
});

// ERROR LOGS: Вывод ошибок выполнения
shell.stderr.on('data', (data) => {
    console.log(`\n\x1b[31m[ERROR]:\x1b[0m\n${data.toString()}`);
    showPrompt();
});

// INPUT: Чтение ввода и отправка в bash
rl.on('line', (input) => {
    if (input.trim() === 'exit') {
        shell.kill();
        process.exit();
    }
    shell.stdin.write(input + '\n');
});

// Приветствие
console.log('\x1b[36m--- Local Bash Session Started (No Docker) ---\x1b[0m\n');
showPrompt();
