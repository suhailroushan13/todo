import readlineSync from "readline-sync";
import fs from "fs/promises";
import jwtTokenVerify from "../helpers/jwtTokenVerify.js";

async function updateTodo() {
  try {
    var token = readlineSync.question("Please enter your JWT Web Token Here: ");
    let verify = jwtTokenVerify(token);
    var fileData = await fs.readFile("data/users.json");
    fileData = JSON.parse(fileData.toString());
    var emailFound = fileData.find((ele) => ele.email == verify.email);
    if (emailFound) {
      var todo_id = readlineSync.question("Enter the Todo ID : ");
      var todofind = emailFound.todos.find((ele) => ele.id == todo_id);
      if (todofind) {
        var task_update = readlineSync.question("Enter The Updated Task ");
        todofind.id = todo_id;
        todofind.task = task_update;
        await fs.writeFile("data/users.json", JSON.stringify(fileData));
        console.log("Task Updated Successfully");
      } else {
        console.log("Todo ID Not Found");
      }
    } else {
      console.log("Email Address Not Found");
    }
  } catch (error) {
    console.log(error);
  }
}

export default updateTodo;
