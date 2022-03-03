import { scheduleJob } from "node-schedule";
import sendSMS from "../sms.js";
import fs from "fs/promises";

async function nodeScheduler(email) {
    try {
        let fileData = await fs.readFile("../data/users.json");
        fileData = JSON.parse(fileData);
        let userInfo = fileData.find((ele) => ele.email == email);
        console.log(userInfo);
        console.table(userInfo.todos)
        userInfo.todos.forEach(element => {

            element.reminders.forEach(ele => {
                // console.log(`${userInfo.fname}_${element.id}`);
                // console.log(ele);
                // console.log(element.task);

                scheduleJob(`${userInfo.fname}_${element.id}`, `${ele}`, () => {
                    sendSMS({
                        msg: `This is a Reminder to Complete your Task\n${element.task}`,
                        mobile: userInfo.mobile
                    });
                });

            });



        });
        // scheduleJob(`${userInfo.fname}`)
    } catch (error) {
        console.error(error);
    }


}

nodeScheduler("mail@adnanali.in");