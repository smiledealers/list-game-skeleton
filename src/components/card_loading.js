import React from 'react';
import { Card, Spinner } from 'react-bootstrap';

import CardWrapper from './card_wrapper';
import HeaderImage from './header_image';

const CardLoading = () => {
  return (
    <div className="br4 br--bottom flex flex-column h-100 w-100 page--card-loading">
      <HeaderImage />

      <CardWrapper>
        <Card.Body className="card-body--loading">
          <Spinner animation="border" />
        </Card.Body>
      </CardWrapper>
    </div>
  );
};

export default CardLoading;
