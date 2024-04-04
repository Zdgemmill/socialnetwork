//create router instance
const router = require("express").Router();

//import user and thought routes
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");

//define endpoints for user and thought routes
router.use("/user", userRoutes);
router.use("/thought", thoughtRoutes);

//export router
module.exports = router;