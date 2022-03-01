import readlineSync from 'readline-sync';
import fs_promises from '../helpers/fs_promises.js';
import bcrypt from 'bcryptjs';
import color from 'cli-color'

var readFile = fs_promises.readFile
var writeFile = fs_promises.writeFile

var msg = color.xterm(202), msg1 = color.xterm(47)
async function register() {
    try {
        console.clear();
        console.log(msg("+---------------------------------+"))
        console.log(msg("\tRegister New User\t\t"));
        console.log(msg("+---------------------------------+"))

        const questions = [
            "Name : ",
            "Password : ",
            "Email : ",
            "Mobile ",
            "Address : "
        ];
        const keys = ['name', 'password', 'email', 'mobile', 'address']
        const userData = { todos: [] }
        let flag = 1
        for (let i = 0; i < questions.length; i++) {
            if (i == 1) {
                userData[keys[i]] = readlineSync.question(`Enter your ${questions[i]}`, {
                    hideEchoBack: true
                });
            }
            else if (i == 3) {
                let mobile = readlineSync.question(`Enter your ${questions[i]}with Country code : `)
                if (mobile[0] === '+' && (mobile.slice(1, -1).length + 1) == 12) {
                    userData[keys[i]] = mobile
                }
                else {
                    console.log("Incorrect number. Try Again")
                    flag = 0
                    break;
                }
            }
            else
                userData[keys[i]] = readlineSync.question(`Enter your ${questions[i]}`);
        }
        if (flag == 0)
            return;
        // Hash,salt and store user password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(userData.password, salt)
        userData.password = hash
    
        var fileData = await readFile('Users.json')

        if (fileData.toString() == "")
            fileData = []
        else
            fileData = JSON.parse(fileData)

        // Double Email Check
        let emailFound = fileData.find(e => e.email == userData.email);
        let mobileFound = fileData.find(e => e.mobile == userData.mobile);
        if (!emailFound && !mobileFound) {
            fileData.push(userData);
            await writeFile('Users.json', JSON.stringify(fileData));
            console.log(msg1("\nUser Registered Successfully\n"))
            return;
        }
        console.log(color.redBright("\nUser Registered already. Try Again!\n"))

    } catch (error) {
        console.error(error);
    }
}


export default register;