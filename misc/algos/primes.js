const data = [23, 5, 6, 9, 100, 149, 143, 121, 33, 47, 65, 332, 97];

function isPrime(num) {
    let factors = 0;
    for (let i = 2; i < num; i++) {
        if (num % i == 0) {
            factors++;
        }
    }
    return (factors == 0) ? true : false;
}


let result = data.filter(isPrime);
console.log(result);