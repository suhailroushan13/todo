import jwt from "jsonwebtoken";
function tokenGenerator(payload) {
  let token = jwt.sign(payload, "cs21.code.in", { expiresIn: 60 * 60 });
  return token;
}

export default tokenGenerator;
