import React, { useState } from "react"
import DatePicker from "react-datepicker"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./update.css"
import "react-datepicker/dist/react-datepicker.css"

const Update = () => {
  let navigate = useNavigate()
  const [date, setDate] = useState()
  const [movie, setMovie] = useState({
    name: "",
    rating: "",
    cast: [],
    genre: "",
    release: Date,
  })

  const dateUpdate = (date) => {
    console.log()
    setDate(date)
    setMovie({
      ...movie,
      release: date,
    })
  }

  const castAdd = (e) => {
    e.preventDefault()
    const { name, rating, cast, genre, release } = movie

    if (name && rating && cast && genre && release) {
      axios
        .post("http://localhost:3030/Update", movie, { withCredentials: true })
        .then((res) => {
          console.log(movie)
          console.log(res.data)
          if (res.data.message === "success") {
            navigate("/")
          }
        })

      toast.success("Movie updated successfully")
    } else {
      toast.error("Please Check all the fields")
    }
  }

  const inputChange = (e) => {
    e.preventDefault()

    const { name, value } = e.target

    if (name === "cast") {
      var castArray = value.split(",")
      setMovie({
        ...movie,
        [name]: castArray,
      })
    } else {
      setMovie({
        ...movie,
        [name]: value,
      })
    }
  }

  return (
    <div className="addMovie">
      <form>
        <div className="addMovieItem">
          <input
            className="inputText"
            type="text"
            name="name"
            value={movie.name}
            onChange={inputChange}
            placeholder="Enter Movie Name"
          />
        </div>
        <div className="addMovieItem">
          <input
            className="inputText"
            type="text"
            name="rating"
            value={movie.rating}
            onChange={inputChange}
            placeholder="Enter Movie Rating"
          />
        </div>
        <div className="addMovieItem">
          <input
            className="inputText"
            type="text"
            name="cast"
            value={movie.cast.name}
            onChange={inputChange}
            placeholder="Enter Movie Cast"
          />
          <ToastContainer theme="colored" />
        </div>
        <div className="addMovieItem">
          <input
            className="inputText"
            type="text"
            name="genre"
            value={movie.genre}
            onChange={inputChange}
            placeholder="Enter Movie Genre"
          />
        </div>
        <div className="addMovieItem">
          <DatePicker
            className="inputText"
            placeholderText="Select Release Date"
            selected={date}
            name="release"
            value={date}
            onChange={dateUpdate}
          />
        </div>
        <button className="addSubmit" onClick={castAdd}>
          Update Movie
        </button>
      </form>
    </div>
  )
}
export default Update
