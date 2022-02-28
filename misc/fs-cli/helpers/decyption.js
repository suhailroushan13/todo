
import CryptoJS from "crypto-js";
function decryption(cipher_token) {
    var bytes = CryptoJS.AES.decrypt(cipher_token, "cs21.code.in");
    var token = bytes.toString(CryptoJS.enc.Utf8);
    return token;
}
export default decryption;

