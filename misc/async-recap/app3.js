import axios from "axios";
import readlineSync from 'readline-sync';
let a = readlineSync.questionInt("Enter Num 1 : ");
let b = readlineSync.questionInt("Enter Num 2 : ");
//Promise chaining
function fireAPI(num1, num2) {
    return axios.get(`http://59.92.225.188/${num1}/${num2}`);
}

fireAPI(a, b)
    .then((res) => {
        let sum1 = res.data;
        console.log(sum1);
        let num3 = readlineSync.questionInt("Enter Num 3 : ");
        return axios.get(`http://59.92.225.188/${sum1}/${num3}`);
    })
    .then((res) => {
        console.log(res.data);
        let sum2 = res.data;
        let num4 = readlineSync.questionInt('Enter num 4');
        return axios.get(`http://59.92.225.188/${sum2}/${num4}`)
    })
    .then((res) => {
        console.log(res.data);
    })
    .catch((err) => {
        console.error(err);
    });

