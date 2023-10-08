const jwt = require("jsonwebtoken");
const studentAuthentication = (req, res, next) => {
  let cookies = req.headers.cookie;
  console.log(cookies)
  if (cookies == undefined) {
    res.send({ message: "Students! Please Login!" });
  } else {
    let token = cookies.split("=")[1];
    var decoded = jwt.verify(token, "student");
    console.log(decoded)
    if (decoded) {
      let userID = decoded.userID;
      req.body.userID = userID;
      console.log("userID", userID);
      next();
    } else {
      res.send({ msg: "Students! Please Login!" });
    }
  }
};


module.exports = {
  studentAuthentication
};
