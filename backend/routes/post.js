const router = require('express').Router();
const postController = require('../controller/post.controller');

const auth = require('../middleware/auth')
const multer = require('../middleware/multer.config');

router.get('/', auth, postController.readAllPost);
router.post('/',auth,multer, postController.createPost);
router.get('/:id', auth, postController.readOnePost);
router.delete('/:id', postController.deleteOnePost);
router.put('/update/:id', auth, multer, postController.update);

module.exports = router;