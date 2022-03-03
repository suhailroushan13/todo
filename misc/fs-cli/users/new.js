import readlineSync from "readline-sync";
import color from "colors-cli";
import fs from "fs/promises";
import sendSMS from "../sms.js";
import bcrypt from "bcrypt";


async function new_something() {
    try {
        let fileData = await fs.readFile("../data/users.json");
        fileData = JSON.parse(fileData);
        console.log(fileData);


    } catch (error) {
        console.error(error);
    }
}
new_something();