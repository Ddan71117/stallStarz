import React from 'react';

const Footer: React.FC = () => {
    const gradientStyle = {
      background: 'rgb(105,11,62)',
      backgroundImage: 'linear-gradient(90deg, rgba(105,11,62,1) 0%, rgba(95,50,68,1) 11%, rgba(22,72,92,1) 36%, rgba(18,73,93,1) 55%, rgba(245,134,36,1) 80%, rgba(105,11,62,1) 100%)',
      position: 'fixed' as const,
      bottom: 0,
      width: '100%',
      boxShadow: '0 -2px 5px rgba(0,0,0,0.1)'
    };

  return (
    <footer 
      className="text-light py-3 mt-auto" 
      style={gradientStyle}
    >
      <div className="container text-center">
        <p className="mb-0">
          Need help? Contact us at{' '}
          <a 
            href="mailto:customersupport@stallstars.com" 
            className="text-light"
            style={{ 
              textDecoration: 'underline',
              fontWeight: 500
            }}
          >
            customersupport@stallstars.com
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;