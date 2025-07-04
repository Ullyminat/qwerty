import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const CardForm = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(title, content);
    setTitle('');
    setContent('');
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Group className="mb-3">
        <Form.Label>Заголовок</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>
      
      <Form.Group className="mb-3">
        <Form.Label>Содержание</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Создать карточку
      </Button>
    </Form>
  );
};

export default CardForm;