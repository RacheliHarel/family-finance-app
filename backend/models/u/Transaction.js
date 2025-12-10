const mongoose = require('mongoose');

// הגדרת סכמת הטרנזקציה
const TransactionSchema = new mongoose.Schema({
    // 1. קישור למשתמש שיצר את הפעולה
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // מפנה למודל 'User' שיצרנו
        required: true
    },
    // 2. סוג הפעולה (הכנסה/הוצאה)
    type: {
        type: String,
        required: true,
        enum: ['income', 'expense'] // ודא שזה רק 'income' או 'expense'
    },
    // 3. הסכום
    amount: {
        type: Number,
        required: true,
        default: 0
    },
    // 4. קישור לקטגוריה (כמו 'מזון', 'שכר דירה')
    category: {
        type: String, // בשלב זה נשמור את הקטגוריה כמחרוזת פשוטה
        required: true
        // בהמשך נוכל להפוך את זה ל-ObjectId שמפנה למודל Category
    },
    // 5. תיאור
    description: {
        type: String,
        trim: true,
        default: ''
    },
    // 6. תאריך הפעולה
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
}, {
    timestamps: true // מוסיף שדות created_at ו-updated_at אוטומטית
});

// ייצוא המודל
module.exports = mongoose.model('Transaction', TransactionSchema);