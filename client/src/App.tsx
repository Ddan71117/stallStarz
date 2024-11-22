import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './components/auth/AuthContext';
import Navbar from './components/NavBar';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import SearchAndListing from "./pages/searchAndListing";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  useEffect(() => {
    fetch("/api")
      .then((response) => response.text())
      .then((data) => {
        console.log("API response:", data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <Router>
      <AuthProvider>
        <div className="min-vh-100 d-flex flex-column bg-light">
          <Navbar />
          <Container fluid className="flex-grow-1 py-4">
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/search" element={<SearchAndListing />} />
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </Container>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;