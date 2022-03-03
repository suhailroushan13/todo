import { pid } from "process";
import fs from "fs";

fs.writeFileSync("process.txt", JSON.stringify(pid));

setInterval(() => {
    console.log("Hello World ! This is Changed Now ");
}, 3000);

