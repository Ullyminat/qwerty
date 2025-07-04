import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import useAuthStore from '../stores/authStore';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, error, isLoading } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(name, email, password);
  };

  return (
    <Form onSubmit={handleSubmit}>

      <Form.Group className="mb-3">
        <Form.Label>Имя</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>
      
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
        variant="success" 
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
      </Button>
    </Form>
  );
};

export default RegisterForm;