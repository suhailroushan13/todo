import readlineSync from "readline-sync";
import color from "colors-cli";
import fs from "fs/promises";
import bcrypt from "bcrypt";
/*
    User Registration
    Req Fields : Name, Password,Email(Unique), Mobile, Address

*/

async function userRegister() {
  try {
    console.clear();
    console.log("+------------------------------------------+");
    console.log(color.green_bt("\t\tUser Register\t\t"));
    console.log("+------------------------------------------+");
    const questions = [
      "Enter Your Name : ",
      "Enter Your Password : ",
      "Enter Your Email : ",
      "Enter Your Mobile : ",
      "Enter Your Address : ",
    ];
    const keys = ["fname", "password", "email", "mobile", "address"];
    const userData = {};
    questions.forEach((que, index) => {
      if (index == 1) {
        let password = readlineSync.question(que, {
          hideEchoBack: true,
        });
        let saltRounds = 10;
        bcrypt.genSalt(saltRounds, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            // Store hash in your password DB.
            userData[keys[index]] = hash;
          });
        });

        console.log(userData[keys]);
      } else {
        userData[keys[index]] = readlineSync.question(que);
      }
    });
    let fileData = await fs.readFile("data/users.json");
    fileData = JSON.parse(fileData);
    let emailFound = fileData.find((user) => user.email == userData.email);
    let mobileFound = fileData.find((user) => user.mobile == userData.mobile);
    if (emailFound || mobileFound) {
      return console.log(color.red_bt("User Registered Already!!!"));
    }
    console.log("This Is User Data", userData);
    fileData.push(userData);
    await fs.writeFile("data/users.json", JSON.stringify(fileData));
    console.log("User Registered Succesfully");
  } catch (error) {
    console.error(error);
  }
}

export default userRegister;
