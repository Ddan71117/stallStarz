import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const gradientStyle = {
    background: 'rgb(105,11,62)',
    backgroundImage: 'linear-gradient(90deg, rgba(105,11,62,1) 0%, rgba(95,50,68,1) 11%, rgba(22,72,92,1) 36%, rgba(18,73,93,1) 55%, rgba(245,134,36,1) 80%, rgba(105,11,62,1) 100%)',
    position: 'fixed' as const,
    top: 0,
    width: '100%',
    zIndex: 1000,
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
  };

  const dropdownStyle = {
    toggle: {
      background: 'transparent',
      border: '2px solid rgba(255,255,255,0.5)',
      borderRadius: '25px',
      padding: '8px 16px',
      color: 'white',
      transition: 'all 0.3s ease'
    },
    menu: {
      width: '200px',
      background: 'rgb(105,11,62)',
      backgroundImage: 'linear-gradient(90deg, rgba(105,11,62,1) 0%, rgba(95,50,68,1) 11%, rgba(22,72,92,1) 36%, rgba(18,73,93,1) 55%, rgba(245,134,36,1) 80%, rgba(105,11,62,1) 100%)',
      border: 'none',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      marginTop: '10px',
      padding: '8px'
    },
    item: {
      padding: '10px 15px',
      borderRadius: '8px',
      margin: '4px 8px',
      transition: 'all 0.2s ease',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  };

  return (
    <>
      <Navbar expand="lg" variant="dark" className="py-2" style={gradientStyle}>
        <Container>
          <Navbar.Brand 
            as={Link} 
            to="/search" 
            className="d-flex align-items-center fw-bold text-white"
          >
            <i className="bi bi-shield-lock me-2"></i>
            stallStarz
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto align-items-center">
              {user ? (
                <Dropdown align="end">
                  <Dropdown.Toggle 
                    variant="outline-light"
                    id="user-dropdown"
                    style={dropdownStyle.toggle}
                    className="d-flex align-items-center hover-effect"
                  >
                    <i className="bi bi-person-circle me-2"></i>
                    {user.username}
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={dropdownStyle.menu}>
                    <Dropdown.Item 
                      as={Link}
                      to="/favorites"
                      className="text-white"
                      style={dropdownStyle.item}
                    >
                      <i className="bi bi-heart-fill text-danger"></i>
                      Favorites
                    </Dropdown.Item>
                    <Dropdown.Divider className="bg-light opacity-25 my-2" />
                    <Dropdown.Item 
                      onClick={handleLogout}
                      className="text-white"
                      style={dropdownStyle.item}
                    >
                      <i className="bi bi-box-arrow-right"></i>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <div className="d-flex gap-2">
                  <Nav.Link 
                    as={Link} 
                    to="/login" 
                    className="btn btn-outline-light"
                    style={{
                      borderRadius: '20px',
                      padding: '8px 16px'
                    }}
                  >
                    Login
                  </Nav.Link>
                  <Nav.Link 
                    as={Link} 
                    to="/signup" 
                    className="btn btn-light"
                    style={{
                      borderRadius: '20px',
                      padding: '8px 16px'
                    }}
                  >
                    Sign Up
                  </Nav.Link>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ height: '56px' }}></div>

      <style>
        {`
          .dropdown-item:hover {
            background-color: rgba(255,255,255,0.1) !important;
          }

          @media (max-width: 991px) {
            .dropdown-menu {
              width: 100% !important;
              margin-top: 10px !important;
            }
            
            .dropdown-toggle {
              width: 100%;
              justify-content: center;
              margin-top: 10px;
            }
          }
        `}
      </style>
    </>
  );
};

export default NavBar;