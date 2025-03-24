import React from "react"
import { Link, Route, Routes } from "react-router"

const App = () => {
  
  
  
   
  return (
    <Routes>
      <Route
        index
        element={
          <>
            index page <Link to="/second">go to second</Link>
          </>
        }
      />
      <Route path="/second" element={<>second page</>} />
    </Routes>
  )
}

export default App
