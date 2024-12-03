import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Dummy components for demonstration
const LoginForm = () => <div>Login Form</div>;
const SignUpForm = () => <div>Sign Up Form</div>;
const SearchAndListing = () => <div>Search and Listing</div>;
const Navbar = () => <nav style={{ backgroundColor: "#007bff", color: "white", padding: "10px" }}>Navbar</nav>;
const Footer = () => <footer style={{ backgroundColor: "#f8f9fa", padding: "10px", textAlign: "center" }}>Footer</footer>;

// ErrorPage Component
const ErrorPage: React.FC = () => {
  // Array of funny 404 messages
  const messages = [
    { title: "Uh-oh! Wrong stall!", text: "We couldn't find what you were looking for. Maybe try the next door?" },
    { title: "Oops, the toilet paper ran out!", text: "This page is as empty as a public restroom after a football game." },
    { title: "Lost in the restroom maze?", text: "Don't worry, we'll help you find your way back. Just head to the homepage!" },
    { title: "Looks like a clogged page!", text: "Our pipes got crossed, and we can't flush this page into view." },
    { title: "404: Bathroom occupied!", text: "This page is taking longer than a toddler learning to potty train. Try again later!" },
    { title: "This page didn't make the cleanliness rating.", text: "If we were a restroom, we'd be shut down by now. Let's find you a better one." },
    { title: "You've hit a no-flush zone!", text: "The page you're looking for doesn't exist. Time to plunge back to the homepage." },
    { title: "404: Page left without washing hands!", text: "Don't worry, we'll sanitize this mistake. Meanwhile, try searching again." },
    { title: "Out of service!", text: "Just like a broken restroom sign, this page is out of order." },
    { title: "Lost in the loo?", text: "This page is nowhere to be found, but you can still rate a restroom!" },
  ];

  // Randomly select a message
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>{randomMessage.title}</h1>
      <p>{randomMessage.text}</p>
      <a href="/" style={{ color: "#007bff", textDecoration: "none" }}>Go Back Home</a>
    </div>
  );
};

// App Component
const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Container>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />

          {/* Protected Routes */}
          <Route path="/search" element={<SearchAndListing />} />

          {/* Redirect Root */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Catch-all for 404 */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
