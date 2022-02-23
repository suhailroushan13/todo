import fs from "fs/promises";
import readlineSync from "readline-sync";
import sendSMS from "../sms.js";
import loading from "loading-cli";
import color from "colors-cli";
import timer from "../helpers/loading.js";

async function deleteUser() {
  try {
    let mobile = readlineSync.question(`Enter your Mobile Number : `);
    let fileData = await fs.readFile("data/users.json");
    fileData = JSON.parse(fileData);

    // Verify Mobile
    let userData = fileData.find((ele) => ele.mobile === mobile);
    if (!userData) {
      console.log(color.red_bt("\nInvalid Credentials!\n"));
      return;
    }
    //Send OTP Logic
    const OTP = Math.random(100).toString().slice(2, 8);

    //send OTP to Phone
    await sendSMS({
      msg: `Hey ${userData.fname}, your One Time Login Password is : ${OTP}`,
      mobile: userData.mobile,
    });
    let counter = 1;
    let inputOTP;
    while (counter <= 3) {
      inputOTP = readlineSync.questionInt("Enter your OTP : ");
      if (inputOTP == OTP) {
        const load = loading({
          frames: ["../", "/..", "../", "/.."],
          text: color.red("Verifying OTP, Please wait!"),
          interval: 500,
        }).start();
        await timer(3000);
        load.stop();
        console.log(color.green_bt("\nUser Verified Successfully\n"));
        fileData = fileData.filter((ele) => !(ele.mobile == mobile));
        await fs.writeFile("data/users.json", JSON.stringify(fileData));
        console.log(
          color.green_bt("User Deleted Successfully from the Database!")
        );
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
export default deleteUser;
