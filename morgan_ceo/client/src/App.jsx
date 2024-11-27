import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RestroomDescription from './pages/RestroomDescription';

function App() {
  return (
    <Router>
      <Routes>
        {/* Root Route */}
        <Route path="/" element={<h1>Welcome to the Full-Stack App</h1>} />
        
        {/* Restroom Description Page Route */}
        <Route path="/restroom" element={<RestroomDescription />} />
      </Routes>
    </Router>
  );
}

export default App;
