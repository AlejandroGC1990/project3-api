const express = require("express");
const router = express.Router();
const upload = require('./storage.config');

const authMiddleware = require('../middlewares/auth.middleware')
const usersController = require('../controllers/users.controller');
const authController = require('../controllers/auth.controller');


router.get('/', (req, res, next) => {
  res.status(200).json({ ok: true })
});


/* Auth */
router.post('/login', authMiddleware.isNotAuthenticated, authController.login);


/* Users */
router.post('/users', upload.single('image'), authController.create);
router.get('/users/me', authMiddleware.isAuthenticated, usersController.getCurrentUser)
router.get('/users/:id', usersController.getUserById);




module.exports = router;