import readlineSync from 'readline-sync';
import color from 'cli-color'
import loading from "loading-cli";

import timer from "../helpers/loading.js"
import loginPassword from "./loginPassword.js"
import forgotPassword from "./forgotPassword.js"
import loginOTP from "./loginOTP.js"

var msg = color.xterm(202), msg1 = color.xterm(47)
async function login() {
    try {
        console.clear();
        console.log(msg("+---------------------------------+"))
        console.log(msg("\tLogin User\t\t"));
        console.log(msg("+---------------------------------+"))

        const options = [
            "Exit the Login screen",
            "Login using OTP",
            "Login using Password",
            "Reset Password"
        ];
        options.forEach((ele, index) => { console.log(color.yellow(`\t${index} To ${ele}`)) });
        console.log(msg("+---------------------------------+"))
        const option = readlineSync.questionInt("Enter Your Option : ");
        if (option >= 0 && option <= options.length) {
            switch (option) {
                case 0:
                    console.log(msg1("Exiting Login menu"))
                    return;
                case 1:
                    await loginOTP()
                    break
                case 2:
                    await loginPassword()
                    break
                case 3:
                    await forgotPassword()
                    break
            }
        }
        else {
            const load = loading({
                "frames": ["☹️", "😐", "🙂", "😄"],
                "text": color.red("Invalid Login Menu Option. Enter Again."),
                "interval": 500,

            }).start();
            await timer(3000);
            load.stop();
            login();
        }
    } catch (error) {
        console.error(error);
    }
}

export default login;