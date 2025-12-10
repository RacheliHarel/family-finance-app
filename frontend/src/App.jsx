import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState("Connecting to Backend...");

  useEffect(() => {
    // שליחת בקשה לשרת ה-Node.js שלנו (פורט 5000)
    fetch('http://localhost:5000') 
      .then(res => {
        // אם השרת הגיב, אבל עם שגיאה, נרשום אותה
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.text(); // השרת שלנו שולח טקסט פשוט
      })
      .then(data => setMessage(data)) // עדכון המצב עם התשובה מהשרת
      .catch(error => {
        console.error("Fetch error:", error);
        setMessage("Error connecting to Node.js Backend 🔴. Check if server is running on port 5000.");
      });
  }, []);

  return (
    <div className="App">
      <h1>Full Stack Connection Check</h1>
      <h2>Backend Message:</h2>
      {/* תצוגת ההודעה מהשרת */}
      <p style={{ fontWeight: 'bold', fontSize: '1.2em' }}>{message}</p>
      {/* אימות ההצלחה */}
      <p style={{ color: message.includes("running") ? 'green' : 'red', fontWeight: 'bold' }}>
        Status: {message.includes("running") ? "✅ SUCCESS" : "Waiting for Server..."}
      </p>
    </div>
  );
}

export default App;