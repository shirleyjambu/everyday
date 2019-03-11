const router = require("express").Router();
const userController = require("./../controller/userController");

router.route("/schedule")
  .get(userController.schedule); 

router.route("/user")
  .post(userController.create)
  .put(userController.update)
  .get(userController.getUser);

router.route("/authenticate") 
.post(userController.login); 

module.exports = router;
