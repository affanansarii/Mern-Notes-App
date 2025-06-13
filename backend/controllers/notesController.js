const Note = require('../models/Note');

exports.getNotes = async (req, res) => {
    const notes = await Note.find({ userId: req.user.id }).sort({ updatedAt: -1 });
    res.json(notes);
};

exports.createNote = async (req, res) => {
    const { title, content } = req.body;
    const note = new Note({ title, content, userId: req.user.id });
    await note.save();
    res.status(201).json(note);
};

exports.updateNote = async (req, res) => {
    const { title, content } = req.body;
    const note = await Note.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        { title, content },
        { new: true }
    );
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
};

exports.deleteNote = async (req, res) => {
    const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json({ message: 'Note deleted' });
};
