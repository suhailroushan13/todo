import jwt from "jsonwebtoken";
function verify() {
  try {
    const decoded = jwt.verify(token, "cs21.code.in");
    return decoded;
  } catch (err) {
    console.error(err);
  }
}
export default verify;
