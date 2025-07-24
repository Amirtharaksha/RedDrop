
import { useEffect, useState } from 'react';
import './Statistics.css'
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';

export const Statistics = () => {
  const [donors, setDonors] = useState(0);
  const [recipients, setRecipients] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3030/countStats')
      .then(res => {
        setDonors(res.data.donors);
        setRecipients(res.data.recipients);
      });
  }, []);

  const data = [
    { name: 'Donors', value: donors },
    { name: 'Recipients', value: recipients }
  ];

  const COLORS = ['#0088FE', '#FF8042'];

  return (
    <div className="statistics-container">
      <h2 className="statistics-title">Donation Statistics</h2>
  
      <div className="chart-section">
        <h3 className="chart-title">Pie Chart</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={100}>
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
  
      <div className="chart-section">
        <h3 className="chart-title">Bar Chart</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
  
};
