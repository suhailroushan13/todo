import readlineSync from "readline-sync";
import color from "colors-cli";
import fs from "fs/promises";
import loading from "loading-cli";
import timer from "../helpers/loading.js";
import sendSMS from "../sms.js";
import bcrypt from "bcrypt";

async function forgotPassword() {
  try {
    console.clear();
    console.log("+------------------------------------------+");
    console.log(color.green_bt("\t\tUser Login\t\t"));
    console.log("+------------------------------------------+");
    let number = readlineSync.question("Please Enter your Mobile Number : ");
    let fileData = await fs.readFile("data/users.json");
    fileData = JSON.parse(fileData);
    let userData = fileData.find((ele) => ele.mobile === number);
    if (!userData) {
      console.log(color.red_bt("\nInvalid Credentials!\n"));
      return;
    }
    let OTP = Math.random(100).toString().slice(2, 8);
    await sendSMS({
      msg: `Hey ${userData.fname}, The OTP to Reset your Password is ${OTP}`,
      mobile: userData.mobile,
    });
    let counter = 1;
    let inputOTP;
    while (counter <= 3) {
      inputOTP = readlineSync.questionInt("Enter your OTP : ");
      if (inputOTP == OTP) {
        console.log(color.green_bt("\nUser Login Successfull\n"));
        setPassword();
        return;
      }
      console.log(
        color.red_bt(`\nInvalid OTP. Try again! ${3 - counter} attempts left\n`)
      );
      counter++;
    }
  } catch (error) {
    console.error(error);
  }
}

async function setPassword() {
  try {
    const saltRounds = 10;
    const myPlaintextPassword = readlineSync.question("Enter New Password : ");
    bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
      console.log(hash);
      let password = hash;
    });
  } catch (error) {
    console.error(error);
  }
}

export default forgotPassword;
