const jwt = require("jsonwebtoken");
const studentDetailAuthentication = (req, res, next) => {
  let token = req.headers.authorization;
  console.log(token)

  if (token == undefined) {
    res.send({ message: "Students! Please Login!" });
  } else {
    
    var decoded = jwt.verify(token, "student");
    console.log(decoded)
    if (decoded) {
      let userID = decoded.userID;
      req.body.userID = userID;
      // console.log("userID", userID);
      next();
    } else {
      res.send({ msg: "Students! Please Login!" });
    }
  }
};

module.exports = {
  studentDetailAuthentication
};
