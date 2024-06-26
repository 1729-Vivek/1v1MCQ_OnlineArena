import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import MCQList from './components/MCQ/MCQList';
import Navbar from './components/Navigation/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/mcqs" component={MCQList} />
        <Route path="/" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;