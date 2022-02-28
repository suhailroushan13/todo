
import CryptoJS from "crypto-js";
function encryption(token) {
    var ciphertext = CryptoJS.AES.encrypt(token, "cs21.code.in").toString();
    return ciphertext;
}
export default encryption;