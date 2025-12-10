// ייבוא מודול Mongoose
const mongoose = require('mongoose');

// הגדרת סכמת המשתמש (User Schema)
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, // חובה למלא
        unique: true,   // חייב להיות ייחודי בבסיס הנתונים
        trim: true      // הסרת רווחים מיותרים
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please fill a valid email address'] 
    },
    password: {
        type: String,
        required: true
    },
    familyMember: {
        type: String,
        default: 'Primary User'
    },
    createdAt: {
        type: Date,
        default: Date.now // תאריך יצירה אוטומטי
    }
});

// ייצוא המודל לשימוש בקוד ה-Node.js
module.exports = mongoose.model('User', UserSchema);