const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema(
	{
		name:{
			type: String,
			required: [true, "Course Name is required"]
		},
		description:{
			type: String,
			required: [true, "Enter description"]
		},
		price:{
			type: Number,
			required: [true, "Enter a Number"]
		},
		isActive:{
			type: Boolean,
			default: true
		},
		createdOn:{
			type: Date,
			default: new Date
		},
		enrollees:[
		{
			userId:{
			type: String,
			required: [true, "Enter Enrollee"]
			},
			enrolledOn:{
			type: Date,
			default: new Date
			}
		}
	]
})

module.exports = mongoose.model("Course", courseSchema)
