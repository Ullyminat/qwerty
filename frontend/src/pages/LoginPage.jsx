import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import LoginForm from '../components/LoginForm';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore';

const LoginPage = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header as="h5">Вход в систему</Card.Header>
            <Card.Body>
              <LoginForm />
              <div className="mt-3 text-center">
                Нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;