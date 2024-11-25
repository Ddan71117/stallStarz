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

  return (
    <Navbar 
      bg="info" 
      variant="dark" 
      expand="lg" 
      className="shadow-sm py-2"
    >
      <Container>
        <Navbar.Brand 
          as={Link} 
          to="/search" 
          className="d-flex align-items-center fw-bold"
        >
          <i className="bi bi-shield-lock me-2"></i>
          sTallStarz
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center gap-3">
            {user && (
              <Nav.Link 
                as={Link} 
                to="/favorites"
                className="btn btn-light d-flex align-items-center animate__animated animate__pulse animate__infinite"
                style={{ animation: 'pulse 2s infinite' }}
              >
                <i className="bi bi-heart-fill text-danger me-2"></i>
                Favorites
              </Nav.Link>
            )}
            
            {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle 
                  variant="light" 
                  id="user-dropdown" 
                  className="d-flex align-items-center"
                >
                  <i className="bi bi-person-circle me-2"></i>
                  {user.username}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item 
                    onClick={handleLogout} 
                    className="d-flex align-items-center"
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>
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
                >
                  Login
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/signup" 
                  className="btn btn-light"
                >
                  Sign Up
                </Nav.Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;