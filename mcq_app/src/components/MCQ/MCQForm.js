import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const MCQForm = () => {
  const [formData, setFormData] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    difficulty: 'easy'
  });

  const { authToken } = useContext(AuthContext);
  const { id } = useParams();  // Get the ID from the URL params
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch the MCQ details for editing
      const fetchMcq = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/mcqs/${id}`, {
            headers: {
              'x-auth-token': authToken
            }
          });
          setFormData(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchMcq();
    }
  }, [id, authToken]);

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
      if (id) {
        await axios.put(`http://localhost:5000/api/mcqs/${id}`, formData, {
          headers: {
            'x-auth-token': authToken
          }
        });
      } else {
        await axios.post('http://localhost:5000/api/mcqs', formData, {
          headers: {
            'x-auth-token': authToken
          }
        });
      }
      navigate('/mcqs');  // Redirect to the MCQ list
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
