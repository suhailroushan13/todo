import readLineSync from "readline-sync";
import timer from "./helpers/loading.js";
import loading from "loading-cli";
import color from 'cli-color'

import todos from "./todos/index.js"
import users from "./users/index.js"

var msg = color.xterm(198)
async function main() {
    try {
        console.clear();
        console.log(color.cyan.blink("+----------------------------+"))
        console.log(color.cyan.blink("\tMenu Options\t"));
        console.log(color.cyan.blink("+----------------------------+"))

        const options = [
            "Exit the Program",
            "Register New User",
            "User Login",
            "Fetch all the Todos",
            "Insert a New Todo",
            "Update a Todo",
            "Delete a Todo",
            "Delete the User Account",
        ];
        options.forEach((ele, index) => { console.log(color.yellow(`\t${index} To ${ele}`)) });
        console.log(color.cyan.blink("+----------------------------+"))

        const option = readLineSync.questionInt("Enter Your Option : ");
        if (option >= 0 && option <= options.length - 1) {
            switch (option) {
                case 1:
                    await users.register()
                    break
                case 2:
                    await users.login()
                    break
                case 3:
                    await todos.getTodos()
                    break
                case 4:
                    await todos.insertTodo()
                    break
                case 5:
                    await todos.updateTodos()
                    break
                case 6:
                    await todos.deleteTodo()
                    break
                case 7:
                    await users.deleteUser()
                    break
            }
            let ShouldContinue = readLineSync.question(msg.italic("Want to continue ?(y/n)"))
            if (ShouldContinue == "Y" || ShouldContinue == "y" || ShouldContinue == "yes") {
                const load = loading({
                    "frames": ["🤩", "😇", "😁", "😄"],
                    "text": color.yellow("Redirecting to Main Menu"),
                    "interval": 600,

                }).start();
                await timer(2000);
                load.stop();
                main();
            }
            else
                console.log(msg.italic("Thank you. Visit us again. BYE! :)"))
        }
        else {
            const load = loading({
                "frames": ["☹️", "😐", "🙂", "😄"],
                "text": color.red("Invalid Menu Option. Try Again. Redirecting .."),
                "interval": 600,

            }).start();
            await timer(3000);
            load.stop();
            main();
        }
    } catch (error) {
        console.error(error);
    }
}

main();