const router = require("express").Router();
const apiRoutes = require("./api");

//using API routes
router.use("/api", apiRoutes);
router.use((req, res) => {
    return res.status(404).send("Not found");
});

//export router
module.exports = router;