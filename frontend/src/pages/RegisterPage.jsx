import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import RegisterForm from '../components/RegisterForm';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore';

const RegisterPage = () => {
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
            <Card.Header as="h5">Регистрация</Card.Header>
            <Card.Body>
              <RegisterForm />
              <div className="mt-3 text-center">
                Уже есть аккаунт? <Link to="/login">Войдите</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;