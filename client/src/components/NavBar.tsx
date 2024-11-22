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
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/search" className="d-flex align-items-center">
          <i className="bi bi-shield-lock me-2"></i>
          sTallStarz
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center">
            {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-dark" id="user-dropdown" className="d-flex align-items-center">
                  <i className="bi bi-person-circle me-2"></i>
                  {user.username}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleLogout} className="d-flex align-items-center">
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
                  className="btn btn-outline-primary px-4"
                >
                  Login
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/signup" 
                  className="btn btn-primary px-4"
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