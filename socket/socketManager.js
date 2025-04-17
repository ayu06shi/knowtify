const debounce = require('lodash.debounce');

// One debounced function per note
const saveNoteToDB = {};
const notes = {};

const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`🟢 User connected: ${socket.id}`);

    socket.on("receive_note", async (noteId) => {
      socket.join(noteId);

      if (!notes[noteId]) {
        const note = await Note.findById(noteId);
        notes[noteId] = note?.content || "";
      }

      socket.emit("load_note", notes[noteId]);
    });

    socket.on("update_note", ({ noteId, content }) => {
      notes[noteId] = content;
      socket.to(noteId).emit("receive_update", content);

      if (!saveNoteToDB[noteId]) {
        saveNoteToDB[noteId] = debounce(async (content) => {
          await Note.findByIdAndUpdate(noteId, { content });
          console.log(`💾 Saved note ${noteId} to DB`);
        }, 1000); // Save 1 second after user stops typing
      }

      saveNoteToDB[noteId](content);
    });

    socket.on("disconnect", () => {
      console.log(`🔴 User disconnected: ${socket.id}`);
    });
  });
};

module.exports = setupSocket;
