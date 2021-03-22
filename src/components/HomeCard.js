import React from 'react';
import { Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomeCard = ({ service }) => {
  return (
    <>
      <Link to={`/dashboard/${service.id}?service=${service.name}`}>
        <Card className='home__card'>
          <Card.Body>
            <Image className='card__image' src={`${service.image}`} />
          </Card.Body>
          <Card.Title className='text-center card__text'>
            {service.name}
          </Card.Title>
        </Card>
      </Link>
    </>
  );
};

export default HomeCard;
