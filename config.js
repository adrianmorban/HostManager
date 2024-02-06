import readline from 'readline';
import fs from 'fs';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const initialConfig = () => {
    return new Promise((resolve, reject) => {
        rl.question('Please enter the default place to save your projects: ', (answer) => {
            if (!answer) answer = 'C:\\xampp\\htdocs';
            try {
                fs.writeFileSync('config.json', JSON.stringify({ defaultProjectPath: answer }));
                console.log(`Your default project path will be: ${answer}`);
                resolve(answer);
            } catch (err) {
                console.log(err);
                reject(err);
            }
            rl.close();
        });
    });
}

export default initialConfig;