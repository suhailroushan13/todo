import bcrypt from 'bcrypt';
//method 1
//salt rounds are also known as cost factor
// The cost factor controls how much time is needed to calculate a single BCrypt hash.
//The higher the cost factor, the more hashing rounds are done.Increasing the cost factor by 1 doubles the necessary time.
//The more time is necessary, the more difficult is brute-forcing.
const plainPwd = '123456';
bcrypt.genSalt(10)
    .then((salt) => {
        console.log(salt);
        return salt;
    })
    .then((salt) => {
        return bcrypt.hash(plainPwd, salt);
    })
    .then((hash) => {
        console.log(hash);
    })
    .catch((err) => {
        console.log(err);
    })


