import axios from "axios";
import readlineSync from 'readline-sync';


async function hitAPI() {
    try {
        let num1 = readlineSync.questionInt("Enter Num 1 : ");
        let num2 = readlineSync.questionInt("Enter Num 2 : ");
        let res1 = await axios.get(`http://59.92.225.188/${num1}/${num2}`);
        let sum1 = res1.data;
        console.log(sum1);
        let num3 = readlineSync.questionInt("Enter Num 3 : ");
        let res2 = await axios.get(`http://59.92.225.188/${sum1}/${num3}`);
        console.log(res2.data);

    } catch (error) {
        console.error(error);
    }
}

hitAPI();