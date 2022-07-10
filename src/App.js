import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Menu from "./components/menu/Menu"
import Add from "./components/add/Add"
import Update from "./components/update/Update"
import Delete from "./components/delete/Delete"

function App() {
  return (
    <div className="flex flex-col justify-center items-center pt-50">
      <Router>
        <Routes>
          <Route path="/" element={<Menu />}></Route>
          <Route path="/add" element={<Add />}></Route>
          <Route path="/update" element={<Update />}></Route>
          <Route path="/delete" element={<Delete />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
