import { useState } from 'react';

// הגדרת רשימות הקטגוריות
const expenseCategories = [ 
    'דיור/שכר דירה/משכנתא', 
    'מזון/מכולת', 
    'תחבורה/רכב', 
    'חשבונות/שירותים', 
    'בילויים/פנאי', 
    'בריאות/ביטוח', 
    'חינוך/לימודים', 
    'ביגוד/קניות', 
    'שונות' 
];
const incomeCategories = [ 
    'שכר', 
    'הכנסה נוספת/עצמאית', 
    'השקעות/רווחים', 
    'מתנות/עזרה' 
];


const TransactionForm = () => {
    // 1. הגדרת משתני המצב (State) של הטופס
    const [formData, setFormData] = useState({
        type: 'expense', // ברירת מחדל: הוצאה
        category: expenseCategories[0],
        description: '',
        amount: '',
        date: new Date().toISOString().slice(0, 10), // תאריך נוכחי בפורמט YYYY-MM-DD
        isTitheRequired: false, 
        isTitheExpense: false,
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // 2. פונקציה לעדכון המצב כששדה משתנה
    const onChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: value,
        }));
    };

    // 3. פונקציה לשליחת הטופס ל-Backend
    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            // הכתובת לנתיב POST שיצרנו ב-transactionRoutes.js
            const response = await fetch('http://localhost:5000/api/transactions', {
                method: 'POST',
                headers: {
                    // חשוב מאוד להגדיר את סוג התוכן כ-JSON
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                // הודעה זו מגיעה ישירות מה-Controller שלנו (transactionController.js)
                setMessage(`Transaction Added! Message from server: ${data.message}`);
                // איפוס הטופס לאחר הצלחה
                setFormData({
                    type: 'expense',
                    category: expenseCategories[0],
                    description: '',
                    amount: '',
                    date: new Date().toISOString().slice(0, 10),
                }); 
            } else {
                setMessage(`Failed to add transaction: ${data.message || 'Server error'}`);
            }
        } catch (error) {
            setMessage('Network Error. Ensure Node.js Backend is running.');
        }
        setLoading(false);
    };


    // רשימת הקטגוריות הפעילה (משתנה לפי סוג העסקה)
    const activeCategories = formData.type === 'expense' ? expenseCategories : incomeCategories;


    return (
        <div className="form-container">
            <h3>Add New Transaction</h3>
            {message && (
                <p style={{ color: message.includes('Failed') ? 'red' : 'green', fontWeight: 'bold' }}>
                    {message}
                </p>
            )}

            <form onSubmit={onSubmit}>
                {/* 1. סוג העסקה (Income/Expense) */}
                <div className="form-group">
                    <label htmlFor="type">Type:</label>
                    <select id="type" name="type" value={formData.type} onChange={onChange} required>
                        <option value="expense">Expense (הוצאה)</option>
                        <option value="income">Income (הכנסה)</option>
                    </select>
                </div>
                
                {/* 2.1. תיבות סימון מותנות לפי סוג העסקה */}
            {formData.type === 'income' && (
                    <div className="form-group checkbox-group">
                        <input
                            type="checkbox"
                            id="isTitheRequired"
                            name="isTitheRequired"
                            checked={formData.isTitheRequired}
                            onChange={onChange}
                        />
                        <label htmlFor="isTitheRequired">האם חייב במעשרות?</label>
                    </div>
                )}

                {formData.type === 'expense' && (
                    <div className="form-group checkbox-group">
                        <input
                            type="checkbox"
                            id="isTitheExpense"
                            name="isTitheExpense"
                            checked={formData.isTitheExpense}
                            onChange={onChange}
                        />
                        <label htmlFor="isTitheExpense">האם נחשב כמעשרות?</label>
                    </div>
                )}

                {/* 2. קטגוריה (משתנה לפי סוג) */}
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <select id="category" name="category" value={formData.category} onChange={onChange} required>
                        {activeCategories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                
                {/* 3. תיאור */}
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input type="text" id="description" name="description" value={formData.description} onChange={onChange} required />
                </div>

                {/* 4. סכום */}
                <div className="form-group">
                    <label htmlFor="amount">Amount:</label>
                    <input type="number" id="amount" name="amount" value={formData.amount} onChange={onChange} required min="0.01" step="any" />
                </div>

                {/* 5. תאריך */}
                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" name="date" value={formData.date} onChange={onChange} required />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Transaction'}
                </button>
            </form>
        </div>
    );
};

export default TransactionForm;