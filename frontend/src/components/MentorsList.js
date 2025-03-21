import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MentorsList = () => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then((res) => {
        const mentorsData = res.data.filter((user) => user.role === 'mentor');
        setMentors(mentorsData);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="space-y-4">
      {mentors.map((mentor) => (
        <div key={mentor._id} className="p-4 border border-gray-200 rounded flex justify-between items-center">
          <div>
            <h4 className="font-semibold">{mentor.username}</h4>
            {mentor.profile && mentor.profile.bio && (
              <p className="text-sm text-gray-600">{mentor.profile.bio}</p>
            )}
          </div>
          <button
            onClick={() => sendChatRequest(mentor._id)}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Request Chat
          </button>
        </div>
      ))}
    </div>
  );
};

const sendChatRequest = async (mentorId) => {
  const openingMessage = prompt('Enter your opening message:');
  if (!openingMessage) return;
  try {
    await axios.post(
      'http://localhost:5000/api/chats/request',
      { receiverId: mentorId, openingMessage },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
    alert('Chat request sent successfully');
  } catch (err) {
    console.error(err);
    alert('Chat request failed');
  }
};

export default MentorsList;
