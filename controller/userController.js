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
      start: new Date(2015, 3, 0),
      end: new Date(2015, 3, 1)
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
    console.log('user Controller :' + req.params.user_id);
    db.User
      .findById({_id:'5c8299d4a955c968c819cdfc'})
      .then((dbUser) => {
        let uArr = prepareSchedule(dbUser);
        res.json(uArr);
      })
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
      let schedule = allSchedule(dbUser);
      res.json(schedule)})
    .catch((err) => {
      console.log(err);
      res.json(err)
    });
  }
}