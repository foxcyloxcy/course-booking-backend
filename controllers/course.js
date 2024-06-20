 const Course = require ("../models/Course")

  //create a course
 module.exports.add = (params) => {
	console.log(params)
 	let newCourse = new Course({
 		name: params.name,
 		description: params.description,
 		price: params.price
 	})

 	return newCourse.save().then((course,err) =>{
 		return (err) ? false : true // if there's an error, return false. Otherwise, return true
 	})
 }

 //View all active courses
module.exports.getAllActive = async () => {
	return await Course.find({isActive: true}).then(resultsFromFindActive => resultsFromFindActive)
}

module.exports.getCourse = async () => {
    try {
        const courses = await Course.find();
        return courses;
    } catch (err) {
        throw err;
    }
}
module.exports.getAllInactive = () => {
	return Course.find({isActive: false}).then(resultsFromFindInactive => resultsFromFindInactive)
}

//Get a specific course
module.exports.get = (params) => {
	console.log(params)
	return Course.findById(params.courseId).then(resultFromFindById => resultFromFindById)
}

//Modify course details
module.exports.update = (params) => {
	let updatedCourse = {
		name: params.name,
		description: params.description,
		price: params.price
	}

	return Course.findByIdAndUpdate(params.courseId, updatedCourse).then((course, err) => {
		return (err) ? false : true
	})
}

//Archive (delete) a course
module.exports.archive = (params) => {
	let updateActive = {
		isActive: false
	}

	return Course.findByIdAndUpdate(params.courseId, updateActive).then((course, err) => {
		return (err) ? false : true
	})
}

//unArchive course
module.exports.unArchive = (params) => {
  let update = {
    isActive: true
  };

  return Course.findByIdAndUpdate(params.courseId, update)
	.then((course, err) => { 
	return  (err)? false : true
	})
};