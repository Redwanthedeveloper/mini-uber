import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import { UserContext } from '../App';

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const history = useHistory();

  const handleLogout = () => {
    setLoggedInUser({});
    firebase
      .auth()
      .signOut()
      .then(() => {
        history.push('/');
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <>
      <Navbar expand='lg' variant='light' className='nav__wrapper'>
        <Container>
          <Navbar.Brand href='/'></Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <Nav.Link className='nav__link'>
                <Link to='/'>Home</Link>
              </Nav.Link>
              <Nav.Link className='nav__link'>
                <Link to=''>Destination</Link>
              </Nav.Link>
              <Nav.Link className='nav__link'>
                <Link to=''>Blog</Link>
              </Nav.Link>
              <Nav.Link className='nav__link'>
                <Link to=''>Contact</Link>
              </Nav.Link>

              {loggedInUser.email ? (
                <Nav.Link className='nav__link login__link'>
                  {loggedInUser.name}
                  <Button onClick={handleLogout}>Logout</Button>
                </Nav.Link>
              ) : (
                <Nav.Link className='nav__link login__link'>
                  <Link to='/login'>Login</Link>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
