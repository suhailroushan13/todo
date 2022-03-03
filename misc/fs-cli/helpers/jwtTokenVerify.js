import jwt from "jsonwebtoken";
function jwtTokenVerify(token) {
  try {
    const decoded = jwt.verify(token, "cs21.code.in");
    return decoded;
  } catch (err) {
    console.error("Invalid Token");
  }
}
export default jwtTokenVerify;
