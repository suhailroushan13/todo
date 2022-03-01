import color from 'cli-color'
import fs from "fs/promises"
import sendSMS from "./helpers/sms.js"
import { scheduleJob } from 'node-schedule'
// import kill from "./kill.js"
// let readFile = fs_promises.readFile

let msg = color.xterm(196), msg1 = color.xterm(47), msg2 = color.xterm(202)
async function checkReminders() {
    try {
        let fileData = await fs.readFile('Users.json');
        // const rule = new schedule.RecurrenceRule();

        if (fileData.toString() == "")
            fileData = []
        else
            fileData = JSON.parse(fileData.toString());
        // let todos = fileData.map((e) => e.todos.filter((e) => e.status === false))
        let todos = []
        for (let i = 0; i < fileData.length; i++) {
            for (let j = 0; j < fileData[i].todos.length; j++) {
                if (fileData[i].todos[j].status == false && fileData[i].todos[j].count != 0) {
                    scheduleJob('1', '2022-03-01T15:29:54.386Z', async () => {
                        await sendSMS("hello Sara", fileData[i].todos[j].mobile)
                    });
                    fileData[i].todos[j].count--
                }
            }
        }
        await writeFile('Users.json', JSON.stringify(fileData))
        console.log(msg1("Reminder sent successfully\n"))
    } catch (error) {
        console.error(error);
    }
}

checkReminders();