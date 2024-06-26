import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import MCQList from './components/MCQ/MCQList';
import Navbar from './components/Navigation/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mcqs" element={<MCQList />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;