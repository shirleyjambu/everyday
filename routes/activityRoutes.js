const router = require("express").Router();
const userController = require("./../controller/userController");

router.route("/schedule/:id")
  .get(userController.schedule); 

router.route("/user/:id?")
  .post(userController.create)
  .put(userController.update)
  .get(userController.getUser);

router.route("/clear")
  .put(userController.clear)
  

router.route("/authenticate") 
.post(userController.login); 

module.exports = router;
