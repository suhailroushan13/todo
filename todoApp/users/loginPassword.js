import readlineSync from 'readline-sync';
import jwt from 'jsonwebtoken';
import color from 'cli-color'
import bcrypt from 'bcryptjs';
import cryptoJS from 'crypto-js'
import fs_promises from '../helpers/fs_promises.js';

let readFile = fs_promises.readFile
let writeFile = fs_promises.writeFile

const secretKey = "ruqayyah`sTodoo"
let msg = color.xterm(202), msg1 = color.xterm(47)
async function loginPassword() {
    try {
        console.clear();
        console.log(msg("+---------------------------------+"))
        console.log(msg("\tLogin User\t\t"));
        console.log(msg("+---------------------------------+"))
        const questions = [
            "Email : ",
            "Password : "
        ];
        const answers = questions.map((que, i) => {
            if (i == 1) {
                return readlineSync.question(`Enter your ${questions[i]}`, { hideEchoBack: true });
            }
            return readlineSync.question(`Enter your ${que}`)
        })

        let fileData = await readFile('Users.json');

        if (fileData.toString() == "")
            fileData = []
        else
            fileData = JSON.parse(fileData)

        // Verify Email and hashed Password
        let matchFound = fileData.find((e) => (e.email === answers[0]));
        if (matchFound) {
            const match = await bcrypt.compare(answers[1], matchFound.password)
            if (match) {
                let payload = {
                    name: matchFound.name,
                    email: matchFound.email,
                    mobile: matchFound.mobile
                }
                // expires in 60 minutes
                const token = jwt.sign(payload, secretKey, { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) })
                //encrypt
                let ciphertext = cryptoJS.AES.encrypt(token, 'secret key 123').toString()
                matchFound.token = ciphertext
                let index = fileData.indexOf(matchFound)
                fileData[index] = matchFound
                await writeFile('Users.json', JSON.stringify(fileData));
                console.log(msg1("\nUser Login Successfull\nToken generated👍\n"))
                return;
            }
        }
        console.log(color.redBright("\nInvalid Credentials!\n"))

    } catch (error) {
        console.error(error);
    }
}

export default loginPassword;