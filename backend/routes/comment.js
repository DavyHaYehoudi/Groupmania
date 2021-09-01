

const router = require('express').Router();
const commentController = require('../controller/comment.controller');

const auth = require('../middleware/auth')


router.post('/createComment',auth, commentController.createComment);
router.get('/',auth, commentController.readAllComments);
router.get('/:id',auth, commentController.readOneComment);
router.get('/post/:id',auth, commentController.getAllCommentsForPostId);
router.delete('/deleteComment/:id',auth, commentController.deleteOneComment);


module.exports = router;



