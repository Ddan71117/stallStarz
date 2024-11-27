import React from 'react';

const ErrorPage: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404</h1>
      <p>Sorry, the page you’re looking for doesn’t exist! Must have been flushed.</p>
      <a href="/">Go Back Home</a>
    </div>
  );
};

export default ErrorPage;