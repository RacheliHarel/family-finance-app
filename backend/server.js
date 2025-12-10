// ייבוא ספריות נדרשות
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// טעינת משתני הסביבה מקובץ .env
dotenv.config();

// יצירת מופע של Express (האפליקציה)
const app = express();

// הגדרת Middleware (תוכנות ביניים)
app.use(express.json()); 
app.use(cors());         
// הגדרת נתיב בסיסי לבדיקה
app.get('/', (req, res) => {
    res.send('Hello World! (from Backend)');
});

// חיבור לבסיס הנתונים (הקוד הקריטי לחיבור)
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected Successfully! 🟢');
    } catch (error) {
        // אם יש שגיאה ב-MONGO_URI (שם משתמש/סיסמה), זה יוצג כאן
        console.error('MongoDB connection failed: 🔴', error.message);
        process.exit(1); 
    }
};

// הפעלת החיבור
connectDB();

// נקודת קצה ראשית לבדיקה (כדי ש-Frontend יוכל לבדוק)
app.get('/', (req, res) => {
    res.send('API is running...');
});

// הפעלת השרת
const PORT = process.env.PORT || 5000;

app.use('/api/transactions', require('./routes/transactionRoutes'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});