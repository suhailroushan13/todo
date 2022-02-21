import bcrypt from "bcrypt";
bcrypt.genSalt(100, (err, salt) => {
  if (err) {
    throw err;
  }
  console.log(salt);
});
