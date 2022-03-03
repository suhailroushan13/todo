import readlineSync from "readline-sync";
import fs from "fs/promises";
import auth from "../helpers/auth.js";
import clc from 'cli-color'

let msg = clc.xterm(196), msg1 = clc.xterm(47), msg2 = clc.xterm(202)

async function insertTodo() {
  try {

    console.clear();
    console.log(msg2("+---------------------------------+"))
    console.log(msg2("\tInsert Todos\t\t"));
    console.log(msg2("+---------------------------------+"))

    /*
    User Authentication
    Methods :Token Decryption, Token Decoding JWT
    Error : Unauthorised Accessed
    */
    let token = readlineSync.question("Please Enter Your Token Here: ");
    let payload = auth(token);
    if (payload) {

      let task = readlineSync.question("Enter your Task : ");
      while (!task) {
        task = readlineSync.question(("Task Cannot be Empty! Please Enter a Task"));
      }
      let deadlineStr = readlineSync.question("Please Enter the Deadline for the Task: ");
      while (!deadlineStr) {
        deadline = readlineSync.question("Deadline Cannot be Empty! Please Enter a Deadline")
      }

      /*
      Checking if the Given Date is Valid or Not
      Methods:  Using a Simple Condition in a While Loop
      Error : Invalid Date
      */

      let deadline = new Date(`${deadlineStr}`); // Converting Deadline to UTC
      console.log(deadline);
      let mins = deadline - ((new Date()) / (1000 * 60));  // Converting to Minutes
      let days = deadline - ((new Date()) / (1000 * 60 * 60 * 24)); // Converting to Days
      console.log(`Minutes = ${mins} and days are ${days}\n the Deadline in UTC is ${deadline}`);
      while (mins < 30 || days > 30) {
        console.log("The Deadline Should be More than 30 minutes and Less than 30 Days and Not be Backdated");
        deadline = readlineSync.question("Enter a Deadline : ");
        while (!deadline) {
          deadline = readlineSync.question("Cannot Leave Empty");
        }
        deadline = new Date(deadline);
        mins = (deadline - new Date()) / (1000 * 60);
        days = (deadline - new Date()) / (1000 * 60 * 60 * 24);
      }

      /*
      Creating a Reminders Array
      Getting the Relative Deadlines and Creating a Reminder Array
      */

      const reminders = [];
      let presentTime = new Date();
      let difference = (+deadline) - (+presentTime);
      let reminder1 = new Date((+presentTime) + (difference / 2));
      reminders.push(reminder1);
      let reminder2 = new Date((+presentTime) + (difference / 2) + (difference / 4));
      reminders.push(reminder2); //Pushed All the Reminder Time Stamos to The Reminder Array

      // Generate a Random id for The String
      let id = Math.random().toString(36).substring(2, 15);


      let fileData = await fs.readFile("data/users.json");
      fileData = JSON.parse(fileData.toString());
      let userInfo = fileData.find((ele) => ele.email == payload.email);
      userInfo.todos.push({ id, task, status: false, deadline, reminders });
      await fs.writeFile("data/users.json", JSON.stringify(fileData));
      console.log("Task Added Successfully!");
      return;
    }
    throw (msg("Invalid Token, Access Denied"));


  }

  catch (error) {
    console.log(error);
  }
}


export default insertTodo;
