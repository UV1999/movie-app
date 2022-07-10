const cors = require("cors")
const express = require("express")
const bodyParser = require("body-parser")
const cookie = require("cookie-parser")
const mongoose = require("mongoose")
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(cookie())

mongoose.connect("mongodb://localhost/movie", (err) => {
  if (err) {
    console.log("Db not connected")
  } else {
    console.log("Db connected")
  }
})

const movieSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  cast: Array,
  genre: String,
  release: Date,
})

const Movie = mongoose.model("movielist", movieSchema)

app.get("/", (req, res) => {
  res.send("API Running")
})

app.post("/Add", async (req, res) => {
  console.log(req.body.name)
  res.cookie("moviename", req.body.name, {
    maxAge: 86400000,
    httpOnly: true,
    domain: "localhost:3000",
  })

  const newmovie = new Movie(req.body)
  await newmovie.save(function (err, result) {
    if (result) {
      console.log(result)
    } else {
      console.log("Error")
    }
  })
  res.send("success")
})

app.post("/Update", async (req, res) => {
  if (req.cookies.access_token === "success") {
    console.log("Cookie success")

    await Movie.findOneAndUpdate({ name: req.body.name }, req.body, {
      upsert: true,
    })
    res.send("success")
  }
})

app.post("/Delete", async (req, res) => {
  if (req.cookies.access_token === "success") {
    console.log("Cookie success for delete")

    await Movie.deleteOne({ name: req.body.name })
    res.send("success")
  }
})

app.listen(3030, () => {
  console.log("Server started")
})
