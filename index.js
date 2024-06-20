//imports
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const userRoutes = require("./routes/user")
const courseRoutes = require("./routes/course")

//database connection
mongoose.connection.once('open', () => console.log("Now connected to MongoDB Atlas"))
// mongoose.connect('mongodb+srv://luckyllemos0909:bSeKZwTOrmGZrQ7V@Cluster-course-booking.srafwwq.mongodb.net/Course-Booking?retryWrites=true&w=majority')
mongoose.connect('mongodb+srv://luckyllemos0909:bSeKZwTOrmGZrQ7V@Cluster-course-booking.srafwwq.mongodb.net/test?retryWrites=true&w=majority')
// mongoose.connect('mongodb://localhost:27017/Course-Booking')



//online_ mongodb+srv://anything_you_want:12345@cluster0.zviqv.mongodb.net/course_booking?retryWrites=true&w=majority
//offline_ mongodb://localhost:27017/course_booking

//server setup
const app = express()
const port = process.env.PORT || 3000

//bodyparser middleware
app.use(express.json())//only looks at requests where the Content-Type header is JSON
app.use(express.urlencoded({extended: true}))// allows post requests to include nested objects

//configure cors
const corsOptions = {
	origin: 'http://127.0.0.1:5500',
	optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

//add all the routes
app.use("/api/users", userRoutes)
app.use("/api/courses", courseRoutes)

//server listening
app.listen(port, () => console.log(`Listening to port ${port}`))