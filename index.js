require('dotenv').config();
const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

// =========================
// Static + Body Parser
// =========================
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

// =========================
 // View Engine
// =========================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// =========================
// Database Connection
// =========================
const db = mysql.createPool({
    host: process.env.HEALTH_HOST,
    user: process.env.HEALTH_USER,
    password: process.env.HEALTH_PASSWORD,
    database: process.env.HEALTH_DATABASE,
});
global.db = db;

// =========================
// Routers
// =========================
const mainRouter = require('./routes/main');
const activitiesRouter = require('./routes/activities');

app.use('/', mainRouter);
app.use('/activities', activitiesRouter);

// Small test route to prove server + routing works
app.get('/test', (req, res) => {
    res.send('Test route is working ✅');
});

// =========================
// Start Server
// =========================
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

