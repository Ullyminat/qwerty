import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import useAuthStore from '../stores/authStore';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <Form onSubmit={handleSubmit}>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      
      <Form.Group className="mb-3">
        <Form.Label>Пароль</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      
      <Button 
        variant="primary" 
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? 'Вход...' : 'Войти'}
      </Button>
    </Form>
  );
};

export default LoginForm;