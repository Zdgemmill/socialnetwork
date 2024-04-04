const router = require("express").Router();
const apiRoutes = require("./api");

//using API routes
router.use("/api", apiRoutes);
//hamdle requests that don't match defined routes
router.use((req, res) => {
    return res.status(404).send("Not found");
});

//export router
module.exports = router;