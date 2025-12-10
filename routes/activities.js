const express = require('express'); 
const router = express.Router();
 
// ADD ACTIVITY — Show form 
router.get('/add', (req, res) => {
    res.render('add');
});

// ADD ACTIVITY — Handle form submission 
router.post('/add', (req, res) => {
    const { date, type, duration, calories, notes } = req.body;

    const sql = `
        INSERT INTO activities (date, type, duration, calories, 
notes)
        VALUES (?, ?, ?, ?, ?)
    `;
    db.query(sql, [date, type, duration, calories, notes], (err) => {
        if (err) throw err;
        res.redirect('/activities/list');
    });
});
// LIST ALL ACTIVITIES 
router.get('/list', (req, res) => {
    const sql = "SELECT * FROM activities ORDER BY date DESC";

    db.query(sql, (err, data) => {
        if (err) throw err;
        // IMPORTANT: no spaces, must match "activities.ejs"
        res.render('activities', { activities: data });
    });
});
// SEARCH FORM 
router.get('/search', (req, res) => {
    res.render('search');
});

// SEARCH — handle results 
router.post('/search', (req, res) => {
    const { type, keyword } = req.body;
    const sql = `
        SELECT * FROM activities
        WHERE type LIKE ? OR notes LIKE ?
    `;
    db.query(sql, [`%${type}%`, `%${keyword}%`], (err, results) => {
        if (err) throw err;
        res.render('results', { results });
    });
});
module.exports = router;

const express = require('express');
const router = express.Router();

// ADD ACTIVITY — Show form
router.get('/add', (req, res) => {
    console.log('GET /activities/add hit');  // debug
    res.render('add');
});

// ADD ACTIVITY — Handle form submission
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

// LIST ALL ACTIVITIES
router.get('/list', (req, res) => {
    console.log('GET /activities/list hit'); // debug
    db.query('SELECT * FROM activities ORDER BY date DESC', (err, data) => {
        if (err) throw err;
        res.render('activities', { activities: data });
    });
});

// SEARCH — show form
router.get('/search', (req, res) => {
    console.log('GET /activities/search hit'); // debug
    res.render('search');
});

// SEARCH — handle results
router.post('/search', (req, res) => {
    const { type, keyword } = req.body;

    const sql = `
        SELECT * FROM activities
        WHERE type LIKE ? OR notes LIKE ?
    `;

    db.query(sql, [`%${type}%`, `%${keyword}%`], (err, data) => {
        if (err) throw err;
        res.render('results', { results: data });
    });
});

module.exports = router;

