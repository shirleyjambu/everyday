const db = require("./../models");
const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';

module.exports = {
  // Create a User upon Registration
  create(req, res){
    db.User.create(req.body)
      .then((dbUser) => {
         res.json(dbUser);
      })
      .catch(err => {
        console.log("Error creating User." + err)
        res.json(err);
      });
  },
  getUser(req, res) {
    console.log('user Controller :' + req.params.user_id);
    db.User
      .findById('5c8299d4a955c968c819cdfc')
      .then(dbUser => res.json(dbUser))
      .catch((err) => {
        console.log(err);
        res.json(err)
      });
  },
  update(req,res){
    
    console.log('User Controller - Update');
    console.log(req.body.user_id);
    console.log(req.body.cmdObj);

    db.User.findOneAndUpdate(
      { _id: req.body.user_id},
      { $push: req.body.cmdObj}
    )
    .then(dbUser => res.json(dbUser))
    .catch((err) => {
      console.log(err);
      res.json(err)
    });
  },
  login(req,res){
    console.log(req.body);
    const { email, password } = req.body;
    db.User.findOne({ email }, function(err, user) {
      if (err) {
        console.error(err);
        res.status(500)
          .json({
          error: 'Internal error please try again'
        });
      } else if (!user) {
        console.log("no user");
        res.json({
            error: 'Incorrect email or password'
          });
      } else {
        user.isCorrectPassword(password, function(err, same) {
          if (err) {
            res.status(500)
              .json({
                error: 'Internal error please try again'
            });
          } else if (!same) {
            res.json({
                error: 'Incorrect email or password'
            });
          } else {
            // Issue token
            const payload = { email };
            const token = jwt.sign(payload, secret, {
              expiresIn: '1h'
            });
            res.cookie('token', token, { httpOnly: true })
              .sendStatus(200);
          }
        });
      }
    });
  },
  schedule(req, res){
    console.log('user Controller :' + req.params.user_id);
    
    db.User.findById(
      { _id: '5c8299d4a955c968c819cdfc'}
    )
    .then(dbUser => {
      console.log(dbUser);
      res.json(dbUser)})
    .catch((err) => {
      console.log(err);
      res.json(err)
    });
  }
}