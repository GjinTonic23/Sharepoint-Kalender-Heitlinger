import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/calendar')
      .then(res => setCalendar(res.data));
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Kalender Übersicht</h1>
      <table border="1" cellPadding={6} style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            {calendar[0] && Object.keys(calendar[0]).map(key => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendar.map((row, i) => {
            // Zeile blau markieren, wenn Option ein Datum enthält
            const isOptionDate = row.Option && /\d{2}\.\d{2}\.\d{4}/.test(row.Option);
            return (
              <tr key={i} style={isOptionDate ? { background: '#cce6ff' } : {}}>
                {Object.values(row).map((val, j) => (
                  <td key={j}>{val}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
