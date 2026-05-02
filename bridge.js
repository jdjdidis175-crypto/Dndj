const { spawn } = require('child_process');
const readline = require('readline');

// Запуск Docker с пробросом порта и Bash-оболочкой
const docker = spawn('docker', [
    'run',
    '-i',               // Интерактивный режим
    '--rm',             // Удалить контейнер после выхода
    '-p', '6070:80',    // Порт для доступа через браузер
    'dorowu/ubuntu-desktop-lxde-vnc',
    'bash'              // Точка входа
]);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '\x1b[32mENTER YOUR NEXT TERMINAL BASH COMMAND HERE > \x1b[0m' 
});

// OUTPUT LOGS: Вывод результата выполнения команд в консоль
docker.stdout.on('data', (data) => {
    console.log(`\n\x1b[36m[CONSOLE OUTPUT LOGS]:\x1b[0m\n${data.toString()}`);
    rl.prompt(); // Снова показываем поле ввода после получения логов
});

// ERROR LOGS: Вывод ошибок
docker.stderr.on('data', (data) => {
    console.error(`\x1b[31m[ERROR]:\x1b[0m ${data}`);
});

// INPUT BASH: Чтение вашего ввода и отправка в Docker
rl.on('line', (line) => {
    if (line.toLowerCase() === 'exit') {
        docker.kill();
        process.exit();
    }
    docker.stdin.write(line + '\n');
});

docker.on('close', (code) => {
    console.log(`\n[SYSTEM]: Docker остановлен (Код: ${code})`);
    process.exit();
});

console.log('\x1b[35m%s\x1b[0m', '--- UBUNTU VNC DESKTOP STARTED ---');
console.log('--- URL: http://localhost:6070 ---');
rl.prompt();
