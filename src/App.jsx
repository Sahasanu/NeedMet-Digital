
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Layout from "./Components/layout/Layout"
import Home from "./Pages/Home/Home"
import ServiceDetails from './Pages/Pricing/ServiceDetails'

function App() {
  return (
    <div className="bg-background-secondary">
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/service/:id" element={<ServiceDetails />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
