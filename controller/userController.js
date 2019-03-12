const db = require("./../models");
const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';
const moment = require('moment');

const prepareSchedule = (dbUser) =>{

  let sArr = dbUser.schedule;

  let fArr = sArr.filter(function(el) {
      return moment(el.time).format('YYYYMMDD') === moment(new Date(Date.now())).format('YYYYMMDD');
  });

  fArr.sort(function(a,b){
    //var dateA=new Date(a.time), dateB=new Date(b.time)
    //return dateB-dateA //sort by date descending

    var da = new Date(a).getTime();
    var db = new Date(b).getTime();
  
    return da > db ? -1 : da < db ? 1 : 0
  });

  dbUser.schedule = fArr;
  return dbUser;

}

const allSchedule = (dbUser) =>{
  let allSchArr = [];
  let sArr = dbUser.schedule;
  sArr.forEach(s => {
    let obj = {
      title: s.note,
      allDay: false,
      start : s.time
      //start: moment(s.time).format('YYYYMMDD hh:mm:ss a')
    }

    allSchArr.push(obj);

  })    
   
  return allSchArr;
}

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
    console.log('user Controller :' + req.params.id);
    db.User
      .findOne({email:req.params.id})
      .then((dbUser) => {
        let uArr = prepareSchedule(dbUser);
        res.json(uArr);
      })
      .catch((err) => {
        console.log(err);
        res.json(err)
      });
  },
  // Update user with items todo
  update(req,res){
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
  // Clear items
  clear(req,res){
    console.log('User Controller - Clear');
    console.log(req.body.user_id);
    console.log(req.body.empObj);

    db.User.findOneAndUpdate(
      { _id: req.body.user_id},
      { $set: req.body.empObj}
    )
    .then(dbUser => res.json(dbUser))
    .catch((err) => {
      console.log(err);
      res.json(err)
    });
  },
  login(req,res){
    
    const { email, password } = req.body;
    db.User.findOne({ email }, function(err, user) {
      if (err) {
        console.log(err);
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
       
    db.User.findOne(
      { _id: req.params.id}
    )
    .then(dbUser => {
      console.log(dbUser);
      let schedule = allSchedule(dbUser);
      res.json(schedule)})
    .catch((err) => {
      console.log(err);
      res.json(err)
    });
  }
}