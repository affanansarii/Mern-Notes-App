const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const {
    getNotes,
    createNote,
    updateNote,
    deleteNote
} = require('../controllers/notesController');

router.use(auth);

router.get('/', getNotes);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;
