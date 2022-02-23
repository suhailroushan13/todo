import readlineSync from "readline-sync";
import fs from "fs/promises";
import jwtTokenVerify from "../helpers/jwtTokenVerify.js";
async function insertTodo() {
  try {
    var token = readlineSync.question("Please enter your JWT Web Token Here: ");
    let verify = jwtTokenVerify(token);
    var fileData = await fs.readFile("data/users.json");
    fileData = JSON.parse(fileData.toString());
    var emailFound = fileData.find((ele) => ele.email == verify.email);
    if (emailFound) {
      var task = readlineSync.question("Enter your Task ");
      var id = Math.random().toString(36).substring(2, 15);
      emailFound.todos.push({ id, task });
      await fs.writeFile("data/users.json", JSON.stringify(fileData));
      console.log("Task Added Successfully");
    } else {
      console.log("Email Address Not Found");
    }
  } catch (error) {
    console.log(error);
  }
}

export default insertTodo;
