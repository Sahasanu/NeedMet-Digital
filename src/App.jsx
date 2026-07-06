
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Layout from "./Components/layout/Layout"
import Home from "./Pages/Home/Home"
import ServiceDetails from './Pages/Pricing/ServiceDetails'
import SuccessPage from './Pages/Checkout/SuccessPage'
import FailurePage from './Pages/Checkout/FailurePage'
import Login from './Pages/Auth/Login'
import Signup from './Pages/Auth/Signup'
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="bg-background-secondary">
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/service/:id" element={<ServiceDetails />} />
              <Route path="/checkout/success" element={<SuccessPage />} />
              <Route path="/checkout/failure" element={<FailurePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  )
}

export default App
