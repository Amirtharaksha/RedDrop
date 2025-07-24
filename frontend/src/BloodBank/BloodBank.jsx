import { useEffect, useState } from 'react';
import axios from 'axios';
import './BloodBank.css';

export const BloodBank = () => {
  const [bloodStats, setBloodStats] = useState({});

  useEffect(() => {
    axios.get('http://localhost:3030/bloodTypeStats')
      .then(res => {
        if (res.data.success) {
          setBloodStats(res.data.data);
        }
      });
  }, []);

  return (
    <div className="bloodbank-container">
      <h2>Blood Bank Overview</h2>
      <div className="blood-type-grid">
        {Object.entries(bloodStats).map(([type, count]) => (
          <div className="blood-card" key={type}>
            <h3>{type}</h3>
            <p>{count} Donations</p>
          </div>
        ))}
      </div>
    </div>
  );
};
