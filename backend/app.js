const express = require('express');
const router = require('./src/routes/api');
const app = new express();


const bodyParser = require('body-parser');
const path = require('path');

// Secirity Middleware
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cors = require('cors');


// Database
const mongoose = require('mongoose');

// .env file
const dotenv = require('dotenv');
dotenv.config();

// Security Middleware Initialization
app.use(cors());

// I have used this helmet middleware for security purpose
// app.use(helmet());
app.use(helmet({ crossOriginEmbedderPolicy: false, originAgentCluster: true }));
app.use(
    helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
            "img-src": ["'self'", "https: data: blob:"],
        },
    })
);


app.use(hpp());
app.use(mongoSanitize());

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rate Limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3000
});

app.use(limiter);


// Database Connection
const DB = process.env.DATABASE;
mongoose
    .connect(DB)
    .then(() => console.log('Database Connected'))
    .catch(err => console.log(err));

// Routes

app.use('/api/v1', router);
app.use('/', (req, res) => {
    res.send('<h1 style="text-align:center">Module 15 Assignment</h1>')
})


// // Frontend routing management
// app.use(express.static('client/dist'));
// app.get('*', function (req, res) {
//     res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
// });


module.exports = app