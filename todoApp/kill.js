import fs from 'fs';
import { kill } from 'process';
const pid = +fs.readFileSync('process.txt');
try {
    kill(pid);
    
} catch (error) {
    console.log("No Process ID to kill");
}

export default kill