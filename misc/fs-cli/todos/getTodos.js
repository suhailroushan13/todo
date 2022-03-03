import readlineSync from "readline-sync";
import fs from "fs/promises";
import jwtTokenVerify from "../helpers/jwtTokenVerify.js";
import decryption from "../helpers/decyption.js";

async function getTodos() {
  try {
    var cipher_token = readlineSync.question("Please enter your Token Here: ");
    let token = decryption(cipher_token);
    let verify = jwtTokenVerify(token);
    var fileData = await fs.readFile("data/users.json");
    fileData = JSON.parse(fileData.toString());
    var emailFound = fileData.find((ele) => ele.email == verify.email);
    if (emailFound) {
      console.log(`The Tasks of the user with email ${verify.email} are :  `);
      // emailFound.todos.forEach((element) => {
        // });
          console.table(emailFound.todos);
    } else {
      console.log("Email Address Not Found");
    }
  } catch (error) {
    console.log(error);
  }
}

export default getTodos;
