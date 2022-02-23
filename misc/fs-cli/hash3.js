
import bcrypt from 'bcrypt';
const plainPwd = '123456';

async function hashingPassword(pwd) {
    try {
        const salt = await bcrypt.genSalt(10);
        console.log(salt);
        const hash = await bcrypt.hash(pwd, salt);
        console.log(hash);
    } catch (error) {
        console.log(error);
    }
}

hashingPassword(plainPwd);
