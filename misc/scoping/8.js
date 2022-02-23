let a = { fname: "Prash", city: "Brisbane" };
let b = a;
let c = { fun: "Movie", sad: "Story" };
console.log(a == b);
console.log(a == a);
console.log(c == c);

b.city = "Bangalore";
console.log(a);
