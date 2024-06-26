import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import MCQItem from './MCQItem';

const MCQList = () => {
  const [mcqs, setMcqs] = useState([]);
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchMcqs = async () => {
      try {
        const response = await axios.get('/api/mcqs', {
          headers: {
            'x-auth-token': authToken
          }
        });
        setMcqs(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMcqs();
  }, [authToken]);

  return (
    <div>
      <h2>MCQ List</h2>
      {mcqs.map(mcq => (
        <MCQItem key={mcq._id} mcq={mcq} />
      ))}
    </div>
  );
};

export default MCQList;