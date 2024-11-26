import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist. Must have been flushed.</p>
      <Link to="/app.tsx">Go Back Home</Link>
    </div>
  );
};

export default NotFound;

