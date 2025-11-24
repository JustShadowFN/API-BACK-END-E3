const { Pool } = require('pg');
const mongoose = require('mongoose');

const sqlConfig = {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT,
};

if (process.env.PG_PASSWORD) {
    sqlConfig.password = process.env.PG_PASSWORD;
}

const sqlPool = new Pool(sqlConfig);

const connectSQL = () => {
    sqlPool.connect(err => {
        if (err) {
            
            return console.error('PostgreSQL connection error', err.stack);
        }
        console.log('PostgreSQL connected!');
    });
};



const connectNoSQL = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('MongoDB connected!'))
        .catch(err => console.error('MongoDB connection error:', err));
};

module.exports = { sqlPool, connectSQL, connectNoSQL };