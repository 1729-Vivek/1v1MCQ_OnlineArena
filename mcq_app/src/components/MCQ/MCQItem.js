import React, { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const MCQItem = ({ mcq }) => {
  const { authToken } = useContext(AuthContext);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this MCQ?')) {
      try {
        await axios.delete(/api/mcqs/${mcq._id}, {
          headers: {
            'x-auth-token': authToken
          }
        });
        // Refresh MCQ list or remove this MCQ from state
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h3>{mcq.question}</h3>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default MCQItem;