import readlineSync from 'readline-sync'
import color from 'cli-color'
import fs_promises from '../helpers/fs_promises.js'
import auth from "../helpers/auth.js"
import sendSMS from "../helpers/sms.js"

let readFile = fs_promises.readFile
let writeFile = fs_promises.writeFile
import { scheduleJob } from 'node-schedule'

let msg = color.xterm(196), msg1 = color.xterm(47), msg2 = color.xterm(202)
async function insertTodo() {
    try {
        console.clear();
        console.log(msg2("+---------------------------------+"))
        console.log(msg2("\tInsert Todos\t\t"));
        console.log(msg2("+---------------------------------+"))

        const token = readlineSync.question("Enter your token : ")
        let todo = readlineSync.question("Enter todo : ")
        while (!todo) {
            todo = readlineSync.question(msg("Cannot leave empty! Enter todo again : "))
        }
        let deadline = readlineSync.question("Enter deadline : ")
        while (!deadline) {
            deadline = readlineSync.question(msg("Cannot leave empty! Enter deadline again : "))
        }
        deadline = new Date(deadline)

        let id = (Math.random() * 100).toString(36).replace('.', '')
        let todoData = { id, todo, deadline, status: false, count: 3 }

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
                    if (+(((deadline - new Date()) / 1000) / 60).toFixed() <= 30)
                        console.log(msg("Deadline should be more than 30 minutes from now\n"))
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
            let index = fileData.indexOf(emailFound)
            fileData[index].todos.push(todoData)
            await writeFile('Users.json', JSON.stringify(fileData))
            // 3 remiders schdule
        
            console.log(msg1("Todo inserted successfully\n"))
            return
        }
        console.log(msg("Unauthorize Access!!\n"))

    } catch (error) {
        console.error(error)
    }
}

export default insertTodo