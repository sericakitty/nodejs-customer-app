const jwt = require('jsonwebtoken');
const user = require('../db/users');
const bcrypt = require('bcrypt');


const login = (req, res) => {
  
  const email = req.body.email;
  const password = req.body.password;
  
  user.getUserByEmail(email, (user) => {
    console.log(user)
    if (user.length > 0) {
      const hashpwd = user[0].password;
      const token = jwt.sign({userId: email}, process.env.SECRET_KEY);
      console.log(token)
      if (bcrypt.compareSync(password, hashpwd))
        res.send({token});
      else
        res.sendStatus(400).end(); 
    }
    else {
      res.sendStatus(400).end();
    }
});
}


const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  if(!token) {
    res.sendStatus(400).end();
  }
  
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err)
     res.sendStatus(400).end();
   else
     next();
  }); 
}

module.exports = {
  authenticate: authenticate,
  login: login
}