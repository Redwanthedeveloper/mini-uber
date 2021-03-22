import React, { useState } from 'react';
import { Form, Button, Container, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Message from '../components/Message';
import firebase from 'firebase/app';

const SignupScreen = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('password do not match');
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {})
      .catch((error) => {
        var errorMessage = error.message;
        setMessage(errorMessage);
      });
    history.push('/');
  };
  return (
    <>
      <Container>
        <Row>
          <Form>
            <h4 className='text-left login__heading py-3'>Create an account</h4>
            {message ? <Message>{message}</Message> : ''}
            <Form.Group controlId='name'>
              <Form.Control
                className='input__field'
                type='text'
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Control
                className='input__field'
                type='email'
                placeholder='Username or Email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Control
                className='input__field'
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='confirmPassword'>
              <Form.Control
                className='input__field'
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              variant='primary'
              type='submit'
              className='input__btn'
              onClick={(e) => handleSubmit(e)}
            >
              Create an account
            </Button>
            <h6 className='my-3 text-center'>
              Already have an account?
              <Link to='/login' className='forgot__link'>
                Login
              </Link>
            </h6>
          </Form>
        </Row>
      </Container>
    </>
  );
};

export default SignupScreen;
