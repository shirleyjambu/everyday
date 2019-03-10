const router = require("express").Router();
const activityRoutes = require("./activityRoutes");

// Book routes
router.use("/api", activityRoutes);

module.exports = router;
