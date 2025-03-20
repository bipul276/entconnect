import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MentorDetail = ({ match }) => {
  const [mentor, setMentor] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/mentors/${match.params.id}`)
      .then(res => setMentor(res.data))
      .catch(err => console.error(err));
  }, [match.params.id]);

  if (!mentor) return <div className="section container">Loading...</div>;

  return (
    <div className="section container mentor-detail">
      <h2 className="section-title">{mentor.name}</h2>
      <img src={mentor.imageUrl || '/images/default-mentor.jpg'} alt={mentor.name} style={{ width: '100%', borderRadius: '8px' }} />
      <p>{mentor.bio}</p>
      <p><strong>Expertise:</strong> {mentor.expertise.join(', ')}</p>
      <p><strong>Contact:</strong> {mentor.contact}</p>
    </div>
  );
};

export default MentorDetail;
