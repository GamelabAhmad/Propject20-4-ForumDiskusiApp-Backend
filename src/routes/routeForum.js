const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const validateRequest = require("../middlewares/validation");
const {
    handleCreateForum,
    handleGetForum,
    handleGetForums,
    handleEditForum,
    handleDeleteForum,
    createValidationForum
} = require("../controllers/controllerForums");

router.post('/forum', auth, validateRequest(createValidationForum), handleCreateForum);
router.get('/forums', handleGetForums);
router.get('/forum/:id', handleGetForum);
router.put('/forum/:id', handleEditForum);
router.delete('/forum/:id', handleDeleteForum);


module.exports = router;
