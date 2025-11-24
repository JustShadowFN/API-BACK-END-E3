require('dotenv').config();
const express = require('express');
const { connectSQL, connectNoSQL } = require('./src/services/db');
const mainRouter = require('./src/routes/index'); 

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectSQL();
connectNoSQL();

app.use('/api/v1', mainRouter);

app.listen(port, () => {
    console.log(`http://localhost:${port}/api/v1`);
});