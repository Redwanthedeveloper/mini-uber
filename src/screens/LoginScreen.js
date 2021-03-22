import React, { useContext, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import firebaseConfig from '../firebase.config';
import firebase from 'firebase/app';
import 'firebase/auth';
import { UserContext } from '../App';

firebase.initializeApp(firebaseConfig);

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [user, setUser] = useState({
    isLoggedIn: false,
    name: '',
    email: '',
    photo: '',
  });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const provider = new firebase.auth.GoogleAuthProvider();

  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: '/' } };

  const googleHandler = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        const credential = result.credential;
        const token = credential.accessToken;
        const { displayName, email, photoURL } = result.user;
        const signedInUser = {
          isLoggedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(signedInUser);
        setLoggedInUser(signedInUser);
      })
      .catch((error) => {});
    history.replace(from);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        const credential = result.credential;
        const token = credential.accessToken;
        const { displayName, email, photoURL } = result.user;
        const signedInUser = {
          isLoggedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(signedInUser);
        setLoggedInUser(signedInUser);
      })
      .catch((error) => {});
    history.replace(from);
  };

  return (
    <>
      <Container>
        <Row>
          <Form>
            <h4 className='text-left login__heading py-3'>Login</h4>
            <Form.Group controlId='formBasicEmail'>
              <Form.Control
                className='input__field'
                type='email'
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
              <Form.Control
                className='input__field'
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='formBasicCheckbox'>
              <Row>
                <Col md={6}>
                  <Form.Check type='checkbox' label='Remember Me' />
                </Col>
                <Col md={6} className=''>
                  <Link to='/' className='float-right forgot__link'>
                    Forgot password
                  </Link>
                </Col>
              </Row>
            </Form.Group>
            <Button
              constiant='primary'
              type='submit'
              className='input__btn'
              onClick={(e) => handleLogin(e)}
            >
              Login
            </Button>
            <h6 className='my-3 text-center'>
              Don't have account?{' '}
              <Link to='/signup' className='forgot__link'>
                Create an account
              </Link>
            </h6>
          </Form>

          <div className='login__with'>
            <Link onClick={googleHandler}>
              <Row>
                <Col md={4}>
                  <FontAwesomeIcon
                    icon={faGoogle}
                    className='icon'
                  ></FontAwesomeIcon>
                </Col>
                <Col md={8} className='w-100 '>
                  Login with google
                </Col>
              </Row>
            </Link>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default LoginScreen;
