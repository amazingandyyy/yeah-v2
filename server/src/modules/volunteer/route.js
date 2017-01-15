const router = require('express').Router();
const controller = require('./controller');

// POST request:
router.post('/createOneOrg', controller.org.create); // require login and orgData in body

// GET request:
// ~/volunteer/getOneOrg/?orgId=5864632bb54f4150a6a883c8
router.get('/getOneOrg', controller.org.getOne);
// ~/volunteer/getAllOrgs
router.get('/getAllOrgs', controller.org.getAll);

// ~/volunteer/getOneEvent/?eventId=5864632bb54f4150a6a883c8
router.get('/getOneEvent', controller.event.getOne);
// ~/volunteer/getAllEvents
router.get('/getAllEvents', controller.event.getAll);
// ~/volunteer/getAllEventsOfOneOrg
router.get('/getAllEventsOfOneOrg', controller.event.getAllEventsOfOneOrg);

// Protected auth request:
router.use('/auth', controller.org.checkAuth);
// router.delete('/auth/deleteOne', controller.deleteOne);
router.post('/auth/createOneEvent', controller.event.create);

module.exports = router;