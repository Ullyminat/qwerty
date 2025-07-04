import React from 'react';
import { Card as BootstrapCard, Button } from 'react-bootstrap';

const Card = ({ card, onDelete, canDelete }) => {
  return (
    <BootstrapCard className="mb-3">
      <BootstrapCard.Body>
        <BootstrapCard.Title>{card.title}</BootstrapCard.Title>
        <BootstrapCard.Text>{card.content}</BootstrapCard.Text>
        <BootstrapCard.Footer className="d-flex justify-content-between">
          <small className="text-muted">
            Автор: {card.createdBy?.name || 'Неизвестен'}
          </small>
          {canDelete && (
            <Button 
              variant="danger" 
              size="sm"
              onClick={() => onDelete(card._id)}
            >
              Удалить
            </Button>
          )}
        </BootstrapCard.Footer>
      </BootstrapCard.Body>
    </BootstrapCard>
  );
};

export default Card;