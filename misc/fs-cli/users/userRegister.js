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
    const userData = { todos: [] };
    questions.forEach((que, index) => {
      if (index == 1) {
        userData[keys[index]] = readlineSync.question(que, {
          hideEchoBack: true,
        });
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
    let salt = await bcrypt.genSalt(12);
    userData.password = await bcrypt.hash(userData.password, salt);
    fileData.push(userData);
    await fs.writeFile("data/users.json", JSON.stringify(fileData));
    console.log("User Registered Succesfully. Go to Login.");
  } catch (error) {
    console.error(error);
  }
}

export default userRegister;
