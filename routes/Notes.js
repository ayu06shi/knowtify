const express = require("express");
const router = express.Router();
const {
  addNotesController,
  getSingleNoteController,
  getAllNotesByUserController,
  updateNotesController,
  deleteNoteController,
  shareNoteController,
  getPublicNotesController,
  requestAccessController,
  approveAccessRequestController
} = require("../controllers/Notes");

const { auth, isStudent } = require("../middleware/auth");

// 📌 Create a new note
router.post("/", auth, isStudent, addNotesController);

// 📌 Get all notes created by the logged-in user
router.get("/my-notes", auth, getAllNotesByUserController);

// 📌 Get a single note by ID
router.get("/:noteId", auth, getSingleNoteController);

// 📌 Update a note
router.put("/:noteId", auth, updateNotesController);

// 📌 Delete a note
router.delete("/:noteId", auth, deleteNoteController);

// 📌 Share a note with another user
router.post("/:noteId/share", auth, shareNoteController);

// 📌 Get all public notes (for discovery/explore)
router.get("/", getPublicNotesController);

// 📌 Request access to a private note
router.post("/:noteId/request-access", auth, requestAccessController);

// 📌 Approve a collaborator’s request
router.post("/:noteId/approve-access", auth, approveAccessRequestController);

module.exports = router;
