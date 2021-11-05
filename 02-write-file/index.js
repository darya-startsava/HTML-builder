const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });
const text = 'Hi! Please, write some text for checking.\n';
const greetingPath = path.join(__dirname, 'greeting.txt');

fs.writeFile(
    greetingPath,
    '',
    (err) => {
        if (err) throw err;
    }
);

rl.on('SIGINT', function () {
    console.log('Bye!');
    process.exit();
});

function askNewQuestion() {
    rl.question('', (answer) => {
        if (answer === 'exit') {
            console.log('Bye!');
            process.exit();
        }
        fs.appendFile(greetingPath, `${answer}\n`, (err) => {
            if (err) throw err;
            askNewQuestion();
        });
    });
}

function askQuestion() {
    rl.question(text, (answer) => {
        if (answer === 'exit') {
            console.log('Bye!');
            process.exit();
        }
        fs.appendFile(greetingPath, `${answer}\n`, (err) => {
            if (err) throw err;
            askNewQuestion();
        });
    });
}
askQuestion();