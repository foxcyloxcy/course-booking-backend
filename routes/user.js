const express = require("express")
const router = express.Router()
const UserController = require("../controllers/user")
const auth = require("../auth")

//User registration
router.post("/", (req, res) => { //req = request, res = response
	console.log(req.body)
	UserController.register(req.body).then(resultFromRegister => res.send(resultFromRegister))
})

//Check if email exists
router.post("/email-exists", (req, res) => {
	UserController.emailExists(req.body).then(resultFromEmailExists => res.send(resultFromEmailExists))
})

//User login
router.post('/login', (req, res) => {
	UserController.login(req.body).then(resultFromLogin => res.send(resultFromLogin))
})

//Get user details
router.get('/details', auth.verify, (req, res) => {
	const user = auth.decode(req.headers.authorization)
	UserController.get({userId: user.id}).then(user => res.send(user))
})

router.get('/all', auth.verify, (req, res) => {
	const users = auth.decode(req.headers.authorization)
	UserController.getAllUsers(req.params).then(user => res.send(user))
})
//get specific id
router.get('/:userId', (req, res) => {
	let userId = req.params.userId
	UserController.get({userId}).then(resultFromFindById => res.send(resultFromFindById))
})

//update Profile
router.put('/update', auth.verify, (req, res) => {
	UserController.update(req.body).then(resultFromUpdate => res.send(resultFromUpdate))
})

//Enroll for a course
router.put('/enroll', auth.verify, (req, res) => {
	let params = {
		userId: auth.decode(req.headers.authorization).id,
		courseId: req.body.courseId,
	}

	UserController.enroll(params).then(resultFromEnroll => res.send(resultFromEnroll))
})


module.exports = router //makes the file exportable