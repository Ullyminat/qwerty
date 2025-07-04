import React, { useEffect } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import Card from '../components/Card';
import useCardStore from '../stores/cardStore';
import useAuthStore from '../stores/authStore';

const HomePage = () => {
  const { cards, isLoading, error, fetchCards } = useCardStore();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

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
      <h1 className="mb-4">Карточки</h1>
      
      {cards.length === 0 ? (
        <Alert variant="info">Карточек пока нет</Alert>
      ) : (
        cards.map(card => (
          <Card 
            key={card._id} 
            card={card}
            onDelete={() => {}}
            canDelete={isAuthenticated && user?.role === 'admin'}
          />
        ))
      )}
    </Container>
  );
};

export default HomePage;