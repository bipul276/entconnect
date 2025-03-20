import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Networks = () => {
  const [networks, setNetworks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/networks')
      .then(res => setNetworks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="section container networks">
      <h2 className="section-title">Business Networks</h2>
      <div className="network-list">
        {networks.map(network => (
          <div key={network._id} className="network-card">
            <h3>{network.name}</h3>
            <p>{network.description}</p>
            {network.website && (
              <a href={network.website} target="_blank" rel="noopener noreferrer" className="btn">
                Visit Website
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Networks;
