const router = require("express").Router();
const activityController = require("./../controller/activityController");
const userController = require("./../controller/userController");
const db = require('./../models');

router.route("/activities")
  .get(activityController.findAll); 

router.route("/schedule")
  .get(userController.schedule); 

router.route("/user")
  .post(userController.create)
  .put(userController.update)
  .get(userController.getUser);

router.route("/authenticate") 
.post(userController.login); 

module.exports = router;
