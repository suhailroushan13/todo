import readlineSync from 'readline-sync';
import color from 'colors-cli';
import fs from 'fs/promises';
import loading from 'loading-cli';
import timer from '../helpers/loading.js';
import sendSMS from '../sms.js';

/*
    User Login
    Req Fields : Email, Password, Mobile, OTP

*/
async function userLogin() {
    try {
        console.clear();
        console.log("+------------------------------------------+");
        console.log(color.green_bt("\t\tUser Login\t\t"));
        console.log("+------------------------------------------+");
        const options = [
            "Exit the Login Screen",
            "Login with One Time Password (Phone OTP) ",
            "Login with Email & Password "
        ];
        options.forEach((ele, index) => console.log(color.yellow(`\t${index} To ${ele}`)));
        const option = readlineSync.questionInt("Enter Your Option From The Above Menu :");
        if (option >= 0 && option <= options.length - 1) {
            switch (option) {
                case 0:
                    console.log(color.green_bt("Exiting the Login."));
                    return;
                case 1:
                    await loginOTP();
                    break;
                case 2:
                    await verifyEmailPassword();
                    break;
            }
        } else {
            const load = loading({
                "frames": ["😟", "😄", "☹️"],
                "text": color.red(" Invalid Menu Option. Try Agaain. Redirecting .."),
                "interval": 500,

            }).start();
            await timer(5000);
            load.stop();
            await userLogin();
        }

    } catch (error) {
        console.error(error);
    }
}

async function loginOTP() {
    try {
        console.clear();
        console.log("+------------------------------------------+");
        console.log(color.green_bt("\t\tUser Login\t\t"));
        console.log("+------------------------------------------+");
        let mobile = readlineSync.question(`Enter your Mobile Number : `);
        let fileData = await fs.readFile('data/users.json');
        fileData = JSON.parse(fileData);

        // Verify Mobile
        let userData = fileData.find(ele => ele.mobile === mobile);
        if (!userData) {
            console.log(color.red_bt("\nInvalid Credentials!\n"));
            return;
        }
        //Send OTP Logic
        const OTP = Math.random(100).toString().slice(2, 8);

        //send OTP to Phone
        await sendSMS({
            msg: `Hey ${userData.fname}, your One Time Login Password is : ${OTP}`,
            mobile: userData.mobile
        });
        let counter = 1;
        let inputOTP;
        while (counter <= 3) {
            inputOTP = readlineSync.questionInt("Enter your OTP : ");
            if (inputOTP == OTP) {
                console.log(color.green_bt("\nUser Login Successfull\n"));
                return;
            }
            console.log(color.red_bt(`\nInvalid OTP. Try again! ${3 - counter} attempts left\n`));
            counter++;
        }

    } catch (error) {
        console.error(error);
    }
}






async function verifyEmailPassword() {
    try {
        console.clear();
        console.log("+------------------------------------------+");
        console.log(color.green_bt("\t\tUser Login\t\t"));
        console.log("+------------------------------------------+");
        let email = readlineSync.question(`Enter your Email : `);
        let password = readlineSync.question(`Enter your Password : `, {
            hideEchoBack: true
        });

        let fileData = await fs.readFile('data/users.json');
        fileData = JSON.parse(fileData);

        // Verify Email & Password
        let matchFound = fileData.find(ele => (ele.email === email && ele.password === password));
        if (matchFound) {
            console.log(color.green_bt("\nUser Login Successfull\n"));
            return;
        }
        console.log(color.red_bt("\nInvalid Credentials!\n"));
    } catch (error) {
        console.error(error);
    }
}

export default userLogin;