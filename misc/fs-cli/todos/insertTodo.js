import readlineSync from "readline-sync";
import fs from "fs/promises";
import jwtTokenVerify from "../helpers/jwtTokenVerify.js";
import decryption from "../helpers/decyption.js";
async function insertTodo() {
  try {
    let cipher_token = readlineSync.question("Please enter your Token Here: ");
    let token = decryption(cipher_token);
    let verify = jwtTokenVerify(token);
    let fileData = await fs.readFile("data/users.json");
    fileData = JSON.parse(fileData.toString());
    let emailFound = fileData.find((ele) => ele.email == verify.email);
    if (emailFound) {
      let task = readlineSync.question("Enter your Task ");
      let date_str = readlineSync.question("Enter the Deadline for the Given Task :");
      let date = new Date(`"${date_str}"`);
      let date_now = new Date();
      while (date < date_now) {
        if (((date - date_now) / (1000 * 60)) > 30 && ((date - date_now) / ((1000 * 60 * 60 * 24))) < 30) {
          let id = Math.random().toString(36).substring(2, 15);
          let status = "pending";
          emailFound.todos.push({ id, task, status, date });
          await fs.writeFile("data/users.json", JSON.stringify(fileData));
          console.log("Task Added Successfully");
          return;
        }
        else {
          date = readlineSync.question("Please Enter a Valid Deadline for the Given Task: ");
        }
      }

    } else {
      console.log("Email Address Not Found");
    }
  } catch (error) {
    console.log(error);
  }
}


export default insertTodo;
