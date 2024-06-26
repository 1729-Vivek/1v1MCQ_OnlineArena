import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const MCQForm = ({ mcq = null, onSave }) => {
  const [formData, setFormData] = useState({
    question: mcq ? mcq.question : '',
    options: mcq ? mcq.options : ['', '', '', ''],
    correctAnswer: mcq ? mcq.correctAnswer : '',
    difficulty: mcq ? mcq.difficulty : 'easy'
  });

  const { authToken } = useContext(AuthContext);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = formData.options.slice();
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (mcq) {
        await axios.put(`/api/mcqs/${mcq._id}`, formData, {
          headers: {
            'x-auth-token': authToken
          }
        });
      } else {
        await axios.post('/api/mcqs', formData, {
          headers: {
            'x-auth-token': authToken
          }
        });
      }
      onSave();
    } catch (error) {
      console.error(error);
      // Handle error (show error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Question</label>
        <input type="text" name="question" value={formData.question} onChange={handleChange} required />
      </div>
      {formData.options.map((option, index) => (
        <div key={index}>
          <label>Option {index + 1}</label>
          <input type="text" value={option} onChange={e => handleOptionChange(index, e.target.value)} required />
        </div>
      ))}
      <div>
        <label>Correct Answer</label>
        <input type="text" name="correctAnswer" value={formData.correctAnswer} onChange={handleChange} required />
      </div>
      <div>
        <label>Difficulty</label>
        <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default MCQForm;
