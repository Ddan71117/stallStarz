import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./components/auth/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";
import Navbar from "./components/NavBar";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import SearchAndListing from "./pages/searchAndListing";
import SearchResults from "./components/SearchResults"; // Import SearchResults component
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [searchQuery, setSearchQuery] = useState<string>(""); // State to manage search query

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <AuthProvider>
        <div className="min-vh-100 d-flex flex-column">
          <Navbar />
          <Container fluid className="flex-grow-1 p-0">
            {/* Search bar for querying locations */}
            <div className="p-3 bg-light">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const queryInput = (e.target as HTMLFormElement)["search"].value;
                  handleSearchSubmit(queryInput);
                }}
              >
                <input
                  type="text"
                  name="search"
                  placeholder="Search for a location"
                  className="form-control"
                  style={{ maxWidth: "400px", margin: "0 auto" }}
                />
                <button type="submit" className="btn btn-primary mt-2">
                  Search
                </button>
              </form>
            </div>

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
                    <SearchResults query={searchQuery} />
                  </ProtectedRoute>
                }
              />

              {/* Redirect root to search for authenticated users */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <SearchResults query={searchQuery} />
                  </ProtectedRoute>
                }
              />

              {/* Redirect all unmatched routes to root */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Container>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;