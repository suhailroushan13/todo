import color from 'colors-cli';
function multiplyNums(left, right) {
    console.log(`Step 1 => ${left}  ${right}`);
    console.log(`Step 2 => `);
    console.log('--------------------------');
    const sums = [];
    let sum = 0;
    while (left >= 1) {
        if (left % 2 == 0) {
            console.log(color.red_bbt(`\t${left}    ${right}`));
        } else {
            console.log(`\t${left}    ${right}`);
            sums.push(right);
            sum += right;
        }
        left = Math.floor(left / 2);
        right = right * 2;
    }
    console.log('--------------------------');
    console.log(`Step 3 => Extract the right numbers\n `);
    console.log(sums.join('' + ' + ') + ' = ', sum);
}

multiplyNums(55, 22);

function strikeOff(num) {
    let digits = num.split('').map(digit => '\u0336' + digit).join('');
    return digits;
}
