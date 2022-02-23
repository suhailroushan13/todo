import readlineSync from "readline-sync";
import timer from "./helpers/loading.js";
import loading from "loading-cli";
import color from "colors-cli";

//Users
import userRegister from "./users/userRegister.js";
import userLogin from "./users/userLogin.js";
import insertTodo from "./todos/insertTodo.js";
import updateTodo from "./todos/updateTodo.js";
import deleteTodo from "./todos/deleteTodo.js";
import getTodos from "./todos/getTodos.js";
import deleteUser from "./users/deleteUser.js";
import forgotPassword from "./users/forgotPassword.js";

async function main() {
  try {
    console.clear();
    console.log("+------------------------------------------+");
    console.log(color.green_bt("\t\tMenu Options\t\t"));
    console.log("+------------------------------------------+");
    const options = [
      "Exit The Program",
      "Register New User",
      "User Login",
      "Fetch all the Todos",
      "Insert a New Todo",
      "Update a Todo",
      "Delete a Todo",
      "Delete the User Acount",
      "Forgot Password",
    ];
    options.forEach((ele, index) =>
      console.log(color.yellow(`\t${index} To ${ele}`))
    );
    console.log("+------------------------------------------+");
    const option = readlineSync.questionInt(
      "Enter Your Option From The Above Menu :"
    );
    if (option >= 0 && option <= options.length - 1) {
      switch (option) {
        case 0:
          console.log(color.green_bt("Exiting the program. Bye. Bye."));
          return;
        case 1:
          await userRegister();
          break;
        case 2:
          await userLogin();
          break;
        case 3:
          await getTodos();
          break;
        case 4:
          await insertTodo();
          break;
        case 5:
          await updateTodo();
          break;
        case 6:
          await deleteTodo();
          break;
        case 7:
          await deleteUser();
          break;
        case 8:
          await forgotPassword();
          break;
      }
      const choice = readlineSync.question(
        color.blue_bt("Do you want to continue : (yes/no)")
      );
      if (
        choice == "y" ||
        choice == "Y" ||
        choice == "yes" ||
        choice == "YES"
      ) {
        main();
      } else {
        console.log(color.green_bt("Exiting the program. Bye. Bye."));
      }
    } else {
      const load = loading({
        frames: ["😟", "😄", "☹️"],
        text: color.red(" Invalid Menu Option. Try Agaain. Redirecting .."),
        interval: 500,
      }).start();
      await timer(5000);
      load.stop();
      main();
    }
  } catch (error) {
    console.error(error);
  }
}

main();
