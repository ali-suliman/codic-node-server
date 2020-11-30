const express = require("express")
const app = express()
const PORT = process.env.PORT || 3030
const bodyParser = require("body-parser")
const cors = require("cors")
const data = require("./data.json")
const mongoose = require("mongoose")

app.use(bodyParser.json())
app.use(cors())

mongoose
  .connect(
    "mongodb://codiccosmos:76OEg4bGJpV6o69s02QISej2sNpeO9LWnxynOXwHEAGal0BC7wkcwR3Ryui4T0aAnCf8BhOv2PRkfENa8hhk3w%3D%3D@codiccosmos.mongo.cosmos.azure.com:10255/?ssl=true&appName=@codiccosmos@",
    {
      auth: {
        user: "codiccosmos",
        password:
          "76OEg4bGJpV6o69s02QISej2sNpeO9LWnxynOXwHEAGal0BC7wkcwR3Ryui4T0aAnCf8BhOv2PRkfENa8hhk3w==",
      },
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: false,
    }
  )
  .then(() => console.log("Connection to CosmosDB successful"))
  .catch((err) => console.error(err))

const Course = mongoose.model(
  "course",
  new mongoose.Schema({
    courseName: String,
    courseLink: String,
  })
)

app.get("/get-data", (req, res) => {
  Course.find({}, (err, val) => {
    if (err) {
      console.log(err)
    }
    res.send({ courses: val })
  })
})

app.listen(PORT, () => {
  console.log("Listening to port: ", PORT)
})

/* 


//To create a base model (collection) to add data to afterwards
const User = mongoose.model(
  "User",
  new mongoose.Schema({ firstName: String, lastName: String, email: String })
)

//This well be automatically filed with data from frontend
const user = new User({
  firstName: "Logan",
  lastName: "Wolverine",
  email: "wolverine.xman@yahoo.com",
})


 mongoose
  .connect(
    "mongodb://codiccosmos:76OEg4bGJpV6o69s02QISej2sNpeO9LWnxynOXwHEAGal0BC7wkcwR3Ryui4T0aAnCf8BhOv2PRkfENa8hhk3w%3D%3D@codiccosmos.mongo.cosmos.azure.com:10255/?ssl=true&appName=@codiccosmos@",
    {
      auth: {
        user: "codiccosmos",
        password:
          "76OEg4bGJpV6o69s02QISej2sNpeO9LWnxynOXwHEAGal0BC7wkcwR3Ryui4T0aAnCf8BhOv2PRkfENa8hhk3w==",
      },
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: false,
    }
  )
  .then(() => console.log("Connection to CosmosDB successful"))
  .catch((err) => console.error(err))

  //to add all courses from data.json to the database


  
data.courses.forEach((crs) => {
  let course = new Course(crs)
  course.save((err, courseSaved) => {
    if (err) {
      console.log(err)
    }
    console.log(courseSaved)
  })
  console.log(course)
})
 */
