const jwt = require("jsonwebtoken");
const authentication = (req, res, next) => {
  let cookies = req.headers.cookie;
  console.log(cookies)
  if (cookies == undefined) {
    res.send({ message: "Respected Teachers! Please Login!" });
  } else {
    let token = cookies.split("=")[1];
    var decoded = jwt.verify(token, "teacher");
    if (decoded) {
      let userID = decoded.userID;
      req.body.userID = userID;
      // console.log("userID", userID);
      next();
    } else {
      res.send({ message: "Respected Teachers! Please Login!" });
    }
  }
};

module.exports = {
  authentication,
};















































// EMAIL=mdalimujtaba29850@outlook.com
// PASSWORD=1A!alimujtaba