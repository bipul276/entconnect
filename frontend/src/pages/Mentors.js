import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Mentors = () => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => {
        const mentorsData = res.data.filter(u => u.role === 'mentor');
        setMentors(mentorsData);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Mentors</h2>
      <ul className="space-y-2">
        {mentors.map(m => (
          <li key={m._id} className="p-4 border border-gray-200 rounded">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold">{m.username}</h4>
                <p className="text-sm text-gray-600">{m.profile?.bio}</p>
              </div>
              <button
                onClick={() => sendChatRequest(m._id)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Request Chat
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const sendChatRequest = async (mentorId) => {
  const openingMessage = prompt('Enter your opening message:');
  if (!openingMessage) return;
  try {
    await axios.post('http://localhost:5000/api/chats/request', {
      receiverId: mentorId,
      openingMessage
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    alert('Chat request sent');
  } catch (err) {
    console.error(err);
    alert('Request failed');
  }
};

export default Mentors;
