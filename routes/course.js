const express = require("express")
const router = express.Router()
const auth = require("../auth")
const CourseController = require("../controllers/course")



//create a new course
router.post("/", auth.verify, (req, res) => {
	console.log(req.body)
	CourseController.add(req.body).then(resultFromAdd => res.send(resultFromAdd))
})

//View all active courses
router.get('/active', (req, res) => {
	CourseController.getAllActive().then(resultsFromFindActive => res.send(resultsFromFindActive))
})

router.get('/all', async (req, res) => {
    try {
        const courses = await CourseController.getCourse();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/inActive', (req, res) => {
	CourseController.getAllInactive().then(resultsFromFindInactive => res.send(resultsFromFindInactive))
})

//Get a specific course
router.get('/:courseId', (req, res) => {
	let courseId = req.params.courseId
	CourseController.get({courseId}).then(resultFromFindById => res.send(resultFromFindById))
})

//Modify course details
router.put('/', auth.verify, (req, res) => {
	CourseController.update(req.body).then(resultFromUpdate => res.send(resultFromUpdate))
})

//Archive (delete) a course
router.delete('/:courseId', auth.verify, (req, res) => {
	let courseId = req.params.courseId
	CourseController.archive({courseId}).then(resultFromArchive => res.send(resultFromArchive))
})

//unArchive course
router.put('/:courseId', auth.verify, (req, res) => {
	let courseId = req.params.courseId
	CourseController.unArchive({courseId}).then(resultFromUnArchive => res.send(resultFromUnArchive))
})


module.exports = router
