import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import Header from './components/Header';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import Dashboard from './screens/Dashboard';
import BookingScreen from './screens/BookingScreen';
import PrivateRoute from './components/PrivateRoute';
import { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header />
        <Switch>
          <Route path='/' exact component={HomeScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/signup' component={SignupScreen} />
          <PrivateRoute path='/dashboard/:id?'>
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path='/booking/:id?'>
            {' '}
            <BookingScreen />
          </PrivateRoute>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
