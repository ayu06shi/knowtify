// models/Note.js

const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

const CollaboratorSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  role: {
    type: String,
    enum: ['editor', 'viewer', 'request_pending'],
    default: 'request_pending',
  },
  requestedAt: {
    type: Date,
    default: Date.now,
  },
  approvedAt: {
    type: Date,
  }
});

const NoteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: Schema.Types.Mixed, // support rich text (Quill, Slate, Markdown)
    default: '',
  },
  courseId: {  // 👈 Add this for course-level linking
    type: Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  createdBy: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  collaborators: {
    type: [CollaboratorSchema],
    default: [],
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true // automatically handles createdAt and updatedAt
});

module.exports = model('Note', NoteSchema);
