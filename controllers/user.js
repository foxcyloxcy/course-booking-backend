const User = require("../models/User") //import user model
const Course = require("../models/Course") //import course model
const bcrypt = require("bcrypt") //import bcrypt
const auth = require("../auth")

module.exports.register = (params) =>{

		let newUser = new User({
		firstName: params.firstName,
		lastName: params.lastName,
		email: params.email,
		mobileNo: params.mobileNo,
		password: bcrypt.hashSync(params.password, 10)// 10 is salt, salt is the number of times the password will be hased and rehashed
	})

	return newUser.save().then((user, err) =>{
		return (err) ? false : true
	})
}

//Check if email exists
module.exports.emailExists = (params) => {
	return User.find({email: params.email}).then(resultFromFind => {
		return resultFromFind.length > 0 ? true : false;
	})
}

//User login
module.exports.login = (params) => {
	return User.findOne({email: params.email}).then(resultFromFindOne => {
		if(resultFromFindOne === null){
			return false
		}

		const isPasswordMatched = bcrypt.compareSync(params.password, resultFromFindOne.password)

		if(isPasswordMatched){
			return {access: auth.createAccessToken(resultFromFindOne.toObject())}
		}else{
			return false
		}

	})
}

//Get user details
module.exports.get = (params) => {
	return User.findById(params.userId).then(resultFromFindById => {
		resultFromFindById.password = undefined
		return resultFromFindById
	})
}

//get all user
module.exports.getAllUsers = (params) => {
	return User.find(params.userId).then(resultFromFind => {
		return resultFromFind
	})
}

//get specific user
module.exports.get = (params) => {
	console.log(params)
	return User.findById(params.userId).then(
		resultFromFindById => resultFromFindById)
}

module.exports.update = (params) => {
	let updatedUser = {
		firstName: params.firstName,
		lastName: params.lastName,
		email: params.email,
		mobileNo: params.mobileNo
	}

	return User.findByIdAndUpdate(params.userId, updatedUser).then((course, err) => {
		return (err) ? false : true
	})
}

//Enroll for a course
module.exports.enroll = (params) => {
	return User.findById(params.userId).then(resultFromEnrollSearch => {
		resultFromEnrollSearch.enrollments.push({courseId: params.courseId})

		return resultFromEnrollSearch.save().then((resultFromSaveUser, err) => {
			return Course.findById(params.courseId).then(resultFromFindByIdCourse => {
				resultFromFindByIdCourse.enrollees.push({userId: params.userId})

				return resultFromFindByIdCourse.save().then((resultFromSaveCourse, err) => {
					return (err) ? false: true
				})
			})
		})
	})
}
