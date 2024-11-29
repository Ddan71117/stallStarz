const getBaseUrl = () => {
  // Check if we're in production by looking at the window location
  const isProd = window.location.hostname !== 'localhost';
  return isProd ? '' : 'http://localhost:3000';
};

export const API_BASE_URL = getBaseUrl();