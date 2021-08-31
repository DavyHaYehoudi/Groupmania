

const router = require('express').Router();
const commentController = require('../controller/comment.controller');

const auth = require('../middleware/auth')


router.post('/createComment',auth, commentController.createComment);
router.delete('/deleteComment/:id',auth, commentController.deleteOneComment);


module.exports = router;



