import readlineSync from 'readline-sync'
import color from 'cli-color'
import fs_promises from '../helpers/fs_promises.js'
import auth from "../helpers/auth.js"

let readFile = fs_promises.readFile
let writeFile = fs_promises.writeFile

let msg = color.xterm(196), msg1 = color.xterm(47), msg2 = color.xterm(202)
async function updateTodos() {
    try {
        console.clear()
        console.log(msg2("+---------------------------------+"))
        console.log(msg2("\tUpdate Todos\t\t"));
        console.log(msg2("+---------------------------------+"))

        const token = readlineSync.question("\nEnter your token : ")
        let todoID = readlineSync.question("\nEnter your todoID : ")
        while (!todoID) {
            todoID = readlineSync.question(msg("Cannot leave empty! Enter todo ID: "))
        }
        let status = readlineSync.question("\n Enter status : ")
        let todo = readlineSync.question("\nEnter new-todo : ")
        let deadline = readlineSync.question("\nEnter new-deadline : ")
        deadline = new Date(deadline)

        let fileData = await readFile('Users.json')
        if (fileData.toString() == "")
            fileData = []
        else
            fileData = JSON.parse(fileData.toString())

        let decoded = auth(token)
        if (decoded) {
            let emailFound = fileData.find(ele => ele.email === decoded.email)
            while (1) {
                if (deadline.getTime() < new Date().getTime()) {
                    if (+(((deadline - new Date()) / 1000) / 60).toFixed() <= 15)
                        console.log(msg("Deadline should be more than 15 minutes from now\n"))
                    else
                        console.log(msg("Deadline is backdated\n"))
                }
                else if (+((deadline - new Date()) / (1000 * 60 * 60 * 24)).toFixed() > 30)
                    console.log(msg("Deadline should be less than 30 days from now\n"))
                else
                    break
                deadline = readlineSync.question("Enter deadline : ")
                deadline = new Date(deadline)
            }
            let matchID = emailFound.todos.find(ele => ele.id === todoID)
            if (matchID) {
                if (!todo)
                    matchID.todo = matchID.todo
                else
                    matchID.todo = todo
                if (!deadline)
                    matchID.deadline = matchID.deadline
                else
                    matchID.deadline = deadline
                if (!status)
                    matchID.status = matchID.status
                else
                    matchID.status = Boolean(status)
                let index = fileData.indexOf(emailFound)
                fileData[index] = emailFound
                await writeFile('Users.json', JSON.stringify(fileData))
                console.log(msg1("Todo updated successfully\n"))
                return;
            }
            console.log(msg("Invalid Todo ID\n"))
            return;
        }
        console.log(msg("Unauthorize Access!!\n"))

    } catch (error) {
        console.error(error)
    }
}

export default updateTodos