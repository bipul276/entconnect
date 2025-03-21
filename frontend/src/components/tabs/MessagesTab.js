import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecommendedMentors from '../RecommendedMentors';

const MessagesTab = () => {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const isMentor = user?.role === 'mentor';

  const [requests, setRequests] = useState([]);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (isMentor) {
      axios
        .get('http://localhost:5000/api/chats/requests', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .then((res) => setRequests(res.data))
        .catch((err) => console.error(err));
    }
    axios
      .get('http://localhost:5000/api/chats', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((res) => setChats(res.data))
      .catch((err) => console.error(err));
  }, [isMentor]);

  const handleRespond = async (requestId, action) => {
    try {
      await axios.post(
        'http://localhost:5000/api/chats/respond',
        { requestId, action },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert(`Request ${action}`);
      setRequests(requests.filter((r) => r._id !== requestId));
      if (action === 'accepted') {
        axios
          .get('http://localhost:5000/api/chats', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          })
          .then((res) => setChats(res.data))
          .catch((err) => console.error(err));
      }
    } catch (err) {
      console.error(err);
      alert('Error responding to request');
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">Messages</h3>
      {isMentor && requests.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium">Pending Chat Requests</h4>
          <ul className="space-y-2">
            {requests.map((req) => (
              <li key={req._id} className="p-2 border border-gray-200 rounded">
                <p>From: {req.sender?.username}</p>
                <p>Message: {req.openingMessage}</p>
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => handleRespond(req._id, 'accepted')}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRespond(req._id, 'rejected')}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <h4 className="font-medium mb-2">Your Chats</h4>
      {chats.length > 0 ? (
        <ul className="space-y-3">
          {chats.map((chat) => (
            <li key={chat._id} className="p-3 border border-gray-200 rounded">
              <p className="font-semibold">
                Chat with {chat.participants.map((p) => p.username).join(', ')}
              </p>
              <div className="mt-2 space-y-1 max-h-40 overflow-y-auto">
                {chat.messages.map((m, idx) => (
                  <p key={idx}>
                    <strong>{m.sender}</strong>: {m.text}
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No chats found.</p>
      )}

      {}
      {!isMentor && <RecommendedMentors />}
    </div>
  );
};

export default MessagesTab;
