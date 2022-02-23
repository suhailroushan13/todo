let obj1 = {
    a: 1,
    b: 2
}

let obj2 = obj1;

obj2.c = 33;
obj2 = { a : 11, b: 22};

console.log(obj1, obj2);