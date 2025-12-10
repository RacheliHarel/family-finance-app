// backend/routes/transactionRoutes.js

const express = require('express');
const router = express.Router();

// ייבוא הפונקציה מה-Controller
const { setTransaction } = require('../controllers/transactionController');

// הגדרת הנתיב (Endpoint)
// כאשר מגיעה בקשת POST לכתובת /api/transactions, הפנה אותה ל-setTransaction
router.post('/', setTransaction);

module.exports = router;