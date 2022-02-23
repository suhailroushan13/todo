import fs from "fs/promises";
import readlineSync from "readline-sync";
import jwtTokenVerify from "../helpers/jwtTokenVerify.js";

async function deleteTodo() {
  try {
    var token = readlineSync.question("Please enter your JWT Web Token Here: ");
    let verify = jwtTokenVerify(token);
    var fileData = await fs.readFile("data/users.json");
    fileData = JSON.parse(fileData.toString());
    var emailFound = fileData.find((ele) => ele.email == verify.email);
    if (emailFound) {
      var delete_id = readlineSync.question(
        "Enter the Todo Id of the Task which has to be Deleted : "
      );
      var delete_find = emailFound.todos.find((ele) => ele.id == delete_id);
      if (delete_find) {
        var removeObject = { id: delete_id, task: delete_find.task };
        emailFound.todos.splice(
          emailFound.todos.findIndex((a) => a.id === removeObject.id),
          1
        );
        await fs.writeFile("data/users.json", JSON.stringify(fileData));
        console.log("Task Deleted Successfully");
      } else {
        console.log("Invalid Todo ID");
      }
    } else {
      console.log("Email Address Not Found");
    }
  } catch (error) {
    console.log(error);
  }
}

export default deleteTodo;
