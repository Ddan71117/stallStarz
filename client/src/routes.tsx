// TODO: Need to import additional and relevant components import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ErrorPage from './components/errorPage';

// TODO: Need to import additional and relevant routes for error handling
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;


