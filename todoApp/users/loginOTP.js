import readlineSync from 'readline-sync';
import color from 'cli-color'
import fs_promises from '../helpers/fs_promises.js';
import sendSMS from "../helpers/sms.js"

var readFile = fs_promises.readFile
var writeFile = fs_promises.writeFile

var msg = color.xterm(196), msg1 = color.xterm(47), msg2 = color.xterm(202)
async function loginOTP() {
    try {
        console.clear();
        console.log(color.cyan("+-----------------------------------+"))
        console.log(color.cyan("\tLogin User Using OTP\t\t"));
        console.log(color.cyan("+-----------------------------------+"))
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
            mobileFound.testOTP = otp
            let index = fileData.indexOf(mobileFound)
            fileData[index] = mobileFound
            await writeFile('Users.json', JSON.stringify(fileData))
            // await sendSMS(otp, mobileFound.mobile)
            //ask user for OTP
            let counter = 0, attempts = 3
            while (counter <= 3) {
                var otpFromUser = readlineSync.question("\nEnter OTP: ")
                if (otp === otpFromUser) {
                    delete fileData[index].testOTP
                    await writeFile('Users.json', JSON.stringify(fileData))
                    console.log(msg1("\nUser Login Successful👍\n"))
                    break
                }
                else {
                    console.log(color.redBright(`\nInvalid OTP👎\n${attempts} attempts left. Try again.\n`))
                    attempts--
                    counter++
                    continue
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

export default loginOTP;