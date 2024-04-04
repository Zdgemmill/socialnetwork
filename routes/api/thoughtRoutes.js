const express = require("express");
const thoughtController = require("../../controllers/thoughtController");

// Create a router instance
const router = express.Router();

// Define routes for handling thoughts
router.get("/", thoughtController.getAllThoughts);
router.post("/", thoughtController.createThought);

router
    .route("/:thoughtId")
    .get(thoughtController.getThoughtById)
    .put(thoughtController.updateThoughtById)
    .delete(thoughtController.deleteThought);

router.post("/:thoughtId/reactions", thoughtController.createReaction);
router.delete("/:thoughtId/reactions/:reactionId", thoughtController.deleteReaction);

// Export the router
module.exports = router;