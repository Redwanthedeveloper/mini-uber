import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import HomeCard from '../components/HomeCard';
import Data from '../data/Data.json';

const HomeScreen = () => {
  const [service, setService] = useState([]);

  useEffect(() => {
    setService(Data);
  }, [service]);

  return (
    <main className='main' style={{ backgroundImage: `url('/images/bg.png')` }}>
      <Container>
        <div className='home__wrapper'>
          <Row>
            {service.map((item) => {
              return (
                <Col md={3} key={item.id}>
                  <HomeCard service={item} />
                </Col>
              );
            })}
          </Row>
        </div>
      </Container>
    </main>
  );
};

export default HomeScreen;
