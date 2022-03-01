import readlineSync from 'readline-sync';
import color from 'cli-color'
import auth from "../helpers/auth.js"
import fs_promises from '../helpers/fs_promises.js';

let readFile = fs_promises.readFile

let msg = color.xterm(196), msg1 = color.xterm(47), msg2 = color.xterm(202)
async function getTodos() {
    try {
        console.clear();
        console.log(msg2("+---------------------------------+"))
        console.log(msg2("\tFetch Todos\t\t"));
        console.log(msg2("+---------------------------------+"))
        const token = readlineSync.question("Enter your token : ");

        let fileData = await readFile('Users.json');
        if (fileData.toString() == "")
            fileData = []
        else
            fileData = JSON.parse(fileData.toString());

        let decoded = auth(token)
        if (decoded) {
            let emailFound = fileData.find(ele => ele.email === decoded.email);
            console.table(emailFound.todos)
            return;
        }
        console.log(msg("Unauthorize Access!!\n"))
    } catch (error) {
        console.error(error);
    }
}

export default getTodos;