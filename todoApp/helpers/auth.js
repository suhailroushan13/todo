import jwt from "jsonwebtoken"
import cryptoJS from 'crypto-js'

function auth(token) {
    //verify key's authenticity
    try {
       let bytes  = cryptoJS.AES.decrypt(token, 'secret key 123');
       let originalText = bytes.toString(cryptoJS.enc.Utf8)
        const decoded = jwt.verify(originalText, "ruqayyah`sTodoo");
        return decoded
    } catch (err) {
        return
    }
}
// auth("")
export default auth

