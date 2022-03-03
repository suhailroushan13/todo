import jwt from "jsonwebtoken"
import CryptoJS from "crypto-js"

//Encrypting Payload


function encrypt(payload) {
    try {
        let token = jwt.sign(payload, "cs21.code.in", { expiresIn: 60 * 60 });
        let ciphertext = CryptoJS.AES.encrypt(token, "cs21.code.in").toString();
        return ciphertext;
    } catch (error) {
        console.error(error);
    }
}
export default encrypt;
