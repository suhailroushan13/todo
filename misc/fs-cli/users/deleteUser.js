import fs from "fs";
import readlineSync from "readline-sync";
import color from "colors-cli";

function readFile(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
function writeFile(fileName, fileData) {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, fileData, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
import sendSMS from "../sms.js";
async function deleteUser() {
  try {
    console.clear();
    console.log(`
   ====================================\n
   \tDelete User\n 
   ====================================`);

    let number = readlineSync.question("Please Enter your Mobile Number : ");
    let userData = await readFile("data/users.json");
    userData = JSON.parse(userData.toString());
    var mobileFound = userData.find((ele) => ele.mobile == number);
    if (mobileFound) {
      let OTP = Math.random(100).toString().slice(2, 8);
      await sendSMS({
        msg: `Hey ${mobileFound.fname}, The OTP to Delete your Account is ${OTP}`,
        mobile: mobileFound.mobile,
      });
      let counter = 1;
      let inputOTP;
      while (counter <= 3) {
        inputOTP = readlineSync.questionInt("Enter your OTP : ");
        if (inputOTP == OTP) {
          console.log(color.green_bt("\nUser Validated Successfully\n"));
          console.log(mobileFound);
          var to_remove = {
            fname: mobileFound.fname,
            password: mobileFound.password,
            mobile: number,
            address: mobileFound.address,
            todos: mobileFound.todos,
          };
          userData.splice(
            userData.findIndex((a) => a.id === to_remove.id),
            1
          );
          console.log(userData);
          await writeFile("data/users.json", JSON.stringify(userData));
          console.log("User Deleted Successfully");
          return;
        }
        console.log(
          color.red_bt(
            `\nInvalid OTP. Try again! ${3 - counter} attempts left\n`
          )
        );
        counter++;
      }
    } else {
      console.log("Mobile Not Found");
    }
  } catch (error) {
    console.log(error);
  }
}

export default deleteUser;
