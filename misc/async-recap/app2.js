import axios from "axios";
import readlineSync from 'readline-sync';
let a = readlineSync.questionInt("Enter Num 1 : ");
let b = readlineSync.questionInt("Enter Num 2 : ");

//Callback hell 
function inputSum(num1, num2) {
    axios.get(`http://59.92.225.188/${num1}/${num2}`)
        .then((res) => {
            let sum1 = res.data;
            console.log(`The Sum 1 : ${sum1}`);
            let num3 = readlineSync.questionInt("Enter Num 3 : ");
            axios.get(`http://59.92.225.188/${sum1}/${num3}`)
                .then((res) => {
                    let sum2 = res.data;
                    console.log(`The Sum 2 : ${sum2}`);
                    let num4 = readlineSync.questionInt("Enter Num 4 : ");
                    axios.get(`http://59.92.225.188/${sum2}/${num4}`)
                        .then((res) => {
                            let sum3 = res.data;
                            console.log(`The Sum 3 : ${sum3}`);
                        })
                        .catch((err) => {
                            console.error(err);
                        })
                })
                .catch((err) => {
                    console.error(err);
                })
        })
        .catch((err) => {
            console.error(err);
        })
}


inputSum(a, b);