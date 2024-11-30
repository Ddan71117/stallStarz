import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Alert, Card, Row, Col, Container } from 'react-bootstrap';
import { useAuth } from './AuthContext';

const LoginForm: React.FC = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(credentials);
      if (result.success) {
        navigate('/search');
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="p-0">
      <Row className="g-0 min-vh-100">
        {/* Image Section */}
        <Col md={6} className="d-none d-md-block position-relative">
          <div 
            className="h-100 w-100"
            style={{
              background: 'url("/images/for login page.png") center/cover no-repeat',
              minHeight: '100vh'
            }}
          >
            
          </div>
        </Col>

        {/* Login Form Section */}
        <Col md={6} className="d-flex align-items-center py-5">
          <div className="w-100 px-4 px-md-5">
            <Card className="border-0 bg-transparent">
              <Card.Body>
                <h4 className="fw-bold mb-4">Login to Your Account</h4>
                
                {error && (
                  <Alert variant="danger" className="mb-4">
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      size="lg"
                      type="text"
                      placeholder="Enter username"
                      value={credentials.username}
                      onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      size="lg"
                      type="password"
                      placeholder="Enter password"
                      value={credentials.password}
                      onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                      required
                    />
                  </Form.Group>

                  <div className="d-grid mb-4">
                  <Button
                    size="lg"
                    variant="primary"
                    type="submit"
                    disabled={loading}
                    style={{
                      background: 'rgb(105,11,62)',
                      backgroundImage: 'linear-gradient(90deg, rgba(105,11,62,1) 0%, rgba(95,50,68,1) 11%, rgba(22,72,92,1) 36%, rgba(18,73,93,1) 55%, rgba(245,134,36,1) 80%, rgba(105,11,62,1) 100%)',
                      border: 'none',
                      transition: 'opacity 0.3s ease',
                      opacity: loading ? 0.7 : 1
                    }}
                    className="text-white"
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </Button>
                  </div>

                  <div className="text-center">
                    <p className="mb-0">
                      Don't have an account?{' '}
                      <Link to="/signup" className="text-decoration-none">
                        Sign up here
                      </Link>
                    </p>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;