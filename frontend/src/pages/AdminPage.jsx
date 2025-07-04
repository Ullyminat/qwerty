import React, { useEffect } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import Card from '../components/Card';
import CardForm from '../components/CardForm';
import useCardStore from '../stores/cardStore';
import useAuthStore from '../stores/authStore';

const AdminPage = () => {
  const { cards, isLoading, error, fetchCards, createCard, deleteCard } = useCardStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const handleCreateCard = (title, content) => {
    createCard(title, content);
  };

  const handleDeleteCard = (id) => {
    deleteCard(id);
  };

  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Админ-панель</h1>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      <CardForm onCreate={handleCreateCard} />
      
      <h2 className="mt-5 mb-3">Все карточки</h2>
      
      {cards.length === 0 ? (
        <Alert variant="info">Карточек пока нет</Alert>
      ) : (
        cards.map(card => (
          <Card 
            key={card._id} 
            card={card}
            onDelete={handleDeleteCard}
            canDelete={true}
          />
        ))
      )}
    </Container>
  );
};

export default AdminPage;