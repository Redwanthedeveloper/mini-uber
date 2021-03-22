import React, { useState } from 'react';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import Message from '../components/Message';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Dashboard = () => {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const service = location.search ? location.search.split('=')[1] : '/';

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [message, setMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (from === '' || to === '') {
      setMessage(true);
    } else {
      history.push(
        `/booking/${id}?service=${service}&location=from${from}to=${to}`
      );
    }
  };

  return (
    <>
      <Container>
        <div className='dashboard__wrapper'>
          <hr />
          <Row>
            <Col md={4}>
              <Form className='dashboard__form'>
                {message ? <Message>please fill the all fields</Message> : ''}
                <Form.Group controlId='formBasicEmail'>
                  <Form.Label>Pick From</Form.Label>
                  <Form.Control
                    className='input__field'
                    type='text'
                    placeholder='Mirpur 1'
                    onChange={(e) => setFrom(e.target.value)}
                    value={from}
                  />
                </Form.Group>

                <Form.Group controlId='formBasicPassword'>
                  <Form.Label>Pick to</Form.Label>
                  <Form.Control
                    className='input__field'
                    type='text'
                    placeholder='Dhanmondi'
                    onChange={(e) => setTo(e.target.value)}
                    value={to}
                  />
                </Form.Group>

                <Button
                  variant='primary'
                  type='submit'
                  className='input__btn'
                  onClick={(e) => handleSubmit(e)}
                >
                  search
                </Button>
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

export default Dashboard;
