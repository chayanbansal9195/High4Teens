var db = require("./database");
var bcrypt = require("bcrypt")


module.exports = function(req, res) {
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var username = req.body.username;
  var email = req.body.email;
  var gender = req.body.gender;
  var password = req.body.password;
  var confirm_password = req.body.confirm_password;

  if (password === confirm_password) {
    var hash=bcrypt.hashSync(password,10)
   
    var sql =
      "INSERT INTO userdetails (firstname,lastname,username,email,gender,password) VALUES ('" +
      firstname +
      "','" +
     lastname +
      "','" +
      username +
      "','" +
      email +
      "','" +
      gender +
      "','" +
      hash +
      "')";
    db.query(sql, (err, results) => {
      if (err) console.log("error occured", err);
      else {
       
        return res.redirect('/');
      } 
    });
  } else {
   res.send("unmatched password")
  }
};