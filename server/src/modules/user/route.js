const router = require('express').Router();
const controller = require('./controller');
const auth = require('./auth');
const middleweare = require('../../middleware');

// public behavior
router.post('/signup', auth.signup);
router.post('/signin', auth.signin);
router.get('/getOneUser', controller.getOneUser);

// login and authorization required
router.use('/api', middleweare.loginRequired, controller.checkAuthorization);
router.get('/api/getCurrentUser', controller.getCurrentUser);

module.exports = router;
