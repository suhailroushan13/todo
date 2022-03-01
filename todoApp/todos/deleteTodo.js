import readlineSync from 'readline-sync';
import color from 'cli-color'
import fs_promises from '../helpers/fs_promises.js';
import auth from "../helpers/auth.js"

let readFile = fs_promises.readFile
let writeFile = fs_promises.writeFile
let msg = color.xterm(196), msg1 = color.xterm(47), msg2 = color.xterm(202)

async function deleteTod() {
    try {
        console.clear();
        console.log(msg2("+---------------------------------+"))
        console.log(msg2("\tDelete Todos\t\t"));
        console.log(msg2("+---------------------------------+"))
        const token = readlineSync.question("Enter your token : ");
        const todoID = readlineSync.question("Enter your todoID : ");

        let fileData = await readFile('Users.json');
        if (fileData.toString() == "")
            fileData = []
        else
            fileData = JSON.parse(fileData.toString());

        let decoded = auth(token)
        if (decoded) {
            let emailFound = fileData.find(ele => ele.email === decoded.email);
            let matchID = emailFound.todos.find(ele => ele.id === todoID)
            if (matchID) {
                emailFound.todos = emailFound.todos.filter(ele => !(ele.id === todoID));
                let index = fileData.indexOf(emailFound)
                fileData[index] = emailFound
                await writeFile('Users.json', JSON.stringify(fileData));
                console.log(msg1("Todo deleted successfully\n"))
                return;
            }
            console.log(msg("Invalid Todo Id\n"))
            return;
        }
        console.log(msg("Unauthorize Access!!\n"))

    } catch (error) {
        console.error(error);
    }
}

export default deleteTod;