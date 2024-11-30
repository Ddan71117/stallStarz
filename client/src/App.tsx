//import { useEffect } from 'react'; -< add it back if needed.
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './components/auth/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicRoute from './components/auth/PublicRoute.tsx';
import Navbar from './components/NavBar';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import SearchAndListing from "./pages/searchAndListing";
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  // Remove the unused API call since it's not being used
  return (
    <Router>
      <AuthProvider>
        <div className="min-vh-100 d-flex flex-column">
          <Navbar />
          <Container fluid className="flex-grow-1 p-0"> {/* Removed padding for full-width content */}
            <Routes>
              {/* Public Routes */}
              <Route 
                path="/login" 
                element={
                  <PublicRoute>
                    <LoginForm />
                  </PublicRoute>
                } 
              />
              <Route 
                path="/signup" 
                element={
                  <PublicRoute>
                    <SignUpForm />
                  </PublicRoute>
                } 
              />

              {/* Protected Routes */}
              <Route 
                path="/search" 
                element={
                  <ProtectedRoute>
                    <SearchAndListing />
                  </ProtectedRoute>
                }
              />

              {/* Redirect root to search for authenticated users */}
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <SearchAndListing />
                  </ProtectedRoute>
                } 
              />

              {/* Redirect all unmatched routes to root */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Container>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;