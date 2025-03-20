import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Chat = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/chats', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => setChats(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Your Chats</h2>
      {chats.map(chat => (
        <ChatBox key={chat._id} chat={chat} />
      ))}
    </div>
  );
};

const ChatBox = ({ chat }) => {
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    // For demonstration, we show an alert.
    // In a real app, you'd POST to /api/chats/:id or use websockets
    alert('Message sending not implemented in this demo.');
  };

  return (
    <div className="border border-gray-200 rounded p-4 mb-4">
      <h4 className="font-semibold mb-2">
        Chat with {chat.participants.map(p => p.username).join(', ')}
      </h4>
      <div className="max-h-48 overflow-y-auto mb-2 space-y-1">
        {chat.messages.map((m, idx) => (
          <p key={idx}>
            <strong>{m.sender}:</strong> {m.text}
          </p>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          value={message}
          onChange={(e)=> setMessage(e.target.value)}
          placeholder="Type a message"
          className="border border-gray-300 rounded px-3 py-2 flex-grow"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
