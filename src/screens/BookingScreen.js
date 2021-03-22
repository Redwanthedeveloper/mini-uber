import React from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Form, Row, Col, Container, Image } from 'react-bootstrap';
import Data from '../data/Data';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const BookingScreen = () => {
  const { id } = useParams();
  const location = useLocation();

  const service = location.search
    ? location.search.split('&')[0].split('=')[1]
    : '/';

  const serviceImage = Data.map((x) => x.image)[id - 1];

  return (
    <>
      <Container>
        <div className='dashboard__wrapper'>
          <hr />
          <Row>
            <Col md={4}>
              <Form className='dashboard__form'>
                <div className='location__overview'></div>
                <Image src={`${serviceImage}`} />
              </Form>
            </Col>
            <Col md={8}>
              <div
                style={{ height: '715px', width: '100%', borderRadius: '15px' }}
              >
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: 'AIzaSyCojCEGsE3MPTkXf6uHO4aDAc8c8iiezp0',
                  }}
                  defaultCenter={{ lat: 59, lng: 30 }}
                  defaultZoom={11}
                  yesIWantToUseGoogleMapApiInternals
                >
                  <AnyReactComponent lat={59.955413} lng={30.337844} />
                </GoogleMapReact>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default BookingScreen;
