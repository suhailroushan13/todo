import jwt from "jsonwebtoken"
import CryptoJS from 'crypto-js'

function auth(token) {
    //verify token's authenticity
    try {
        let bytes = CryptoJS.AES.decrypt(token, 'cs21.code.in');
        let originalText = bytes.toString(CryptoJS.enc.Utf8)
        const decoded = jwt.verify(originalText, "cs21.code.in");
        return decoded;
    } catch (err) {
        return;
    }
}
export default auth