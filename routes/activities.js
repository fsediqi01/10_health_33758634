const express = require('express');
const router = express.Router();

// ---------------------------
// ADD ACTIVITY — FORM
// ---------------------------
router.get('/add', (req, res) => {
    res.render('add');
});

// ---------------------------
// ADD ACTIVITY — SUBMIT FORM
// ---------------------------
router.post('/add', (req, res) => {
    const { date, type, duration, calories, notes } = req.body;

    const sql = `
        INSERT INTO activities (date, type, duration, calories, notes)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [date, type, duration, calories, notes], (err) => {
        if (err) throw err;
        res.redirect('/activities/list');
    });
});

// ---------------------------
// LIST ALL ACTIVITIES
// ---------------------------
router.get('/list', (req, res) => {
    const sql = "SELECT * FROM activities ORDER BY date DESC";

    db.query(sql, (err, results) => {
        if (err) throw err;
        res.render('activities', { activities: results });
    });
});

// ---------------------------
// SEARCH FORM PAGE
// ---------------------------
router.get('/search', (req, res) => {
    res.render('search');
});

// ---------------------------
// SEARCH RESULTS
// ---------------------------
router.post('/search', (req, res) => {
    const { type, keyword } = req.body;

    let sql = "SELECT * FROM activities WHERE 1=1";
    const params = [];

    if (type) {
        sql += " AND type LIKE ?";
        params.push(`%${type}%`);
    }

    if (keyword) {
        sql += " AND notes LIKE ?";
        params.push(`%${keyword}%`);
    }

    db.query(sql, params, (err, results) => {
        if (err) throw err;
        res.render('results', { activities: results });
    });
});

module.exports = router;



