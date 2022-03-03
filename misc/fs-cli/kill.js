import process from "process";
import fs from "fs";
let p_id = fs.readFileSync("process.txt")
p_id = JSON.parse(p_id);
process.kill(p_id, "SIGTERM");
