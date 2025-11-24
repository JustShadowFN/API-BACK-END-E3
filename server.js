require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const { connectSQL, connectNoSQL } = require('./src/services/db');
const mainRouter = require('./src/routes/index');

const app = express();
const port = process.env.PORT || 3000;


app.use(cors({ origin: 'http://localhost:5173' })); 

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100 
});
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 

connectSQL();
connectNoSQL();

app.use('/api/v1', mainRouter);

module.exports = app;

if (require.main === module) {
    app.listen(port, () => {
        console.log(`ZenTrack Pro API running on http://localhost:${port}/api/v1`);
        console.log(`Documentation available at http://localhost:${port}/docs`);
    });
}