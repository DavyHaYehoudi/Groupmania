const router = require("express").Router();
const authController = require("../controller/auth.controller");
const auth = require('../middleware/auth')


// auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/profil", auth, authController.userProfil);
router.delete('/delete',auth, authController.deleteProfile);

module.exports = router;
