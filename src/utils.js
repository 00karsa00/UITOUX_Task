const jwt = require("jsonwebtoken");
const jwtKey = "shhhhh";
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

exports.createJWTToken = (data) => {

  let token = jwt.sign(data, jwtKey);
  return token;
};

exports.verifyJWTToken = (token, cb) => {
  jwt.verify(token, "shhhhh", function (err, decoded) {
    if (err) {
        console.log("err => ",err)
        return cb({error: true, message: "Authorization error."})
    }
    return cb({error: false, data: decoded})
  });
};

exports.generateHashPassword = (password) => {
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            // Store hash in your password DB.
            console.log(hash)
            return hash
        });
    });
}

// bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
//     // result == true
//     console.log(result);
// });
