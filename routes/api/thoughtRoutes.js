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

router.post("/:thoughtId/reactions", thoughtController.addReaction); // corrected route handler name
router.delete("/:thoughtId/reactions/:reactionId", thoughtController.removeReaction); // corrected route handler name

// Export the router
module.exports = router;