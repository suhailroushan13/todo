import readlineSync from 'readline-sync';
import fs_promises from '../helpers/fs_promises.js';
import sendSMS from "../helpers/sms.js"
import color from 'cli-color'
import bcrypt from 'bcryptjs';

var readFile = fs_promises.readFile
var writeFile = fs_promises.writeFile
var msg = color.xterm(196), msg1 = color.xterm(47), msg2 = color.xterm(202)

async function forgotPassword() {
    try {
        console.clear();
        console.log(`
   ====================================\n
   \tReset Password\n 
   ====================================`);
        let mobile = readlineSync.question(`Enter your Phone number: `);
        var fileData = await readFile('Users.json');

        if (fileData.toString() == "")
            fileData = []
        else
            fileData = JSON.parse(fileData)

        // check if mobile number exits
        let mobileFound = fileData.find(e => e.mobile === mobile)
        // Generate OTP and store it in DB
        if (mobileFound) {
            const otp = Math.random(100).toString().slice(2, 8)
            await sendSMS(otp, mobileFound.mobile)
            //ask user for OTP
            let counter = 0, attempts = 3
            while (counter <= 3) {

                var otpFromUser = readlineSync.question("\nEnter OTP: ")
                if (otp === otpFromUser) {
                    const newPass = readlineSync.question(`Enter your new Password: `, { hideEchoBack: true });
                    const confirmPass = readlineSync.question(`Confirm Password: `, { hideEchoBack: true });

                    // Hash,salt and store user password
                    if (newPass == confirmPass) {
                        const salt = await bcrypt.genSalt(10)
                        const hash = await bcrypt.hash(newPass, salt)
                        mobileFound.password = hash
                        await writeFile('Users.json', JSON.stringify(fileData));
                        console.log(msg1("\nPassword reset successfully👍\n"))
                    }
                    else
                        console.log(msg1("\nPasswords do not match\n"))
                    break

                }
                else {
                    console.log(color.redBright(`\nInvalid OTP👎\n${attempts} attempts left. Try again.\n`))
                    attempts--
                    counter++
                }
            }
            if (counter == 4) {
                console.log(msg("Account blocked"))
                return;
            }
        }
        else
            console.log(msg("\nInvalid Mobile Number!\n"))

    } catch (error) {
        console.error(error);
    }
}

export default forgotPassword;