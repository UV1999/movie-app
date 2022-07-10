import React from "react"
import { useNavigate } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
import "./menu.css"

const Menu = () => {
  let navigate = useNavigate()

  const menuAction = (e) => {
    const action = e.target.value
    if (action === "add") {
      navigate("/add")
    } else if (action === "update") {
      navigate("/update")
    } else if (action === "delete") {
      navigate("/delete")
    }
  }

  return (
    <div className="menu">
      <form>
        <h1 className="menuHeader">Movie Database</h1>
        <div className="menuList">
          <button className="menuButton" value="add" onClick={menuAction}>
            Add
          </button>
        </div>
        <div className="menuList">
          <button className="menuButton" value="update" onClick={menuAction}>
            Update
          </button>
        </div>
        <div className="menuList">
          <button className="menuButton" value="delete" onClick={menuAction}>
            Delete
          </button>
        </div>
      </form>
    </div>
  )
}
export default Menu
