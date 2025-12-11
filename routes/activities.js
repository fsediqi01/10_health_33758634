<<<<<<< HEAD
const express = require('express'); 
const router = express.Router();
 
// ADD ACTIVITY — Show form 
router.get('/add', (req, res) => {
    res.render('add');
});
// ADD ACTIVITY — Handle form submission 
router.post('/add', (req, res) => {
    const { date, type, duration, calories, notes } = req.body;
=======
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

>>>>>>> 7c67138d406c4fed6b58f5f3eaeef93b17c8d8b4
    const sql = `
        INSERT INTO activities (date, type, duration, calories, notes)
        VALUES (?, ?, ?, ?, ?)
    `;
<<<<<<< HEAD
=======

>>>>>>> 7c67138d406c4fed6b58f5f3eaeef93b17c8d8b4
    db.query(sql, [date, type, duration, calories, notes], (err) => {
        if (err) throw err;
        res.redirect('/activities/list');
    });
});
<<<<<<< HEAD
// LIST ALL ACTIVITIES 
router.get('/list', (req, res) => {
    db.query("SELECT * FROM activities ORDER BY date DESC", (err, data) => {
        if (err) throw err;
        res.render('activities', { activities: data });
    });
});
// SEARCH FORM 
router.get('/search', (req, res) => {
    res.render('search');
});
// SEARCH RESULTS 
router.post('/search', (req, res) => {
    const { type, keyword } = req.body;
    const sql = `
        SELECT * FROM activities
        WHERE type LIKE ? OR notes LIKE ?
    `;
    db.query(sql, [`%${type}%`, `%${keyword}%`], (err, data) => {
=======

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
>>>>>>> 7c67138d406c4fed6b58f5f3eaeef93b17c8d8b4
        if (err) throw err;
        res.render('results', { activities: results });
    });
});
module.exports = router;
<<<<<<< HEAD
=======



>>>>>>> 7c67138d406c4fed6b58f5f3eaeef93b17c8d8b4
