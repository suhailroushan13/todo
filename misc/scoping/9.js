const arr1 = [11, 12, 13];
const arr2 = arr1; //this is a pointer to arr1 (it wont copy)

console.log(arr1 == arr2);

console.log(arr2[2]);
arr2[2] = 33;
arr2.push(100, 101, 102, 104, 105);
console.log(arr1);