const express = require('express');
const app = express();
// const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// set up env variables
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Set up mongo db 
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection;
db.on('error', err => console.log(err));
db.once('open', () => console.log('Connection with mongoDG ready!'));


// MIDDLEWARE
app.use('/assets', express.static('public'));
app.use(express.json());


// --- AUTH PATHS ---
const authRouters = require('./routers/apiAuth/apiAuthRouters');
authRouters(app);

// -- RESTRICTED PATHS ---
const restrictedRouters = require('./routers/apiRestricted/apiRestrictedRouters');
restrictedRouters(app);

app.listen(4000);