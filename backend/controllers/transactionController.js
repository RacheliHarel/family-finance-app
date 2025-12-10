// backend/controllers/transactionController.js

// פונקציה אסינכרונית לטיפול בבקשת POST ליצירת עסקה חדשה
const setTransaction = (req, res) => {
    // נשתמש בקוד הזה לבדיקה לפני שמשלבים את המודל של מונגוז.
    // אם הנתונים מגיעים לשרת, נחזיר אותם:
    res.status(200).json({
        message: 'Transaction creation route accessed successfully!',
        data: req.body 
    });
};

// ייצוא הפונקציה כדי שנוכל להשתמש בה ב-Router
module.exports = {
    setTransaction,
};