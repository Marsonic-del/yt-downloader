const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { logQueryParams } = require('./utils/logger')
const { PORT } = require('./config');
// const pool = require('./db/db');

const app = express();

// const connectToDB = async () => {
//     try {
//         await pool.connect();
//         console.log('connect')
//     } catch (err) {
//         console.log(err);
//     }
// };

// connectToDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(logQueryParams);

app.use(route);

// централизованный обработчик
app.use(errorHandler);

app.listen(PORT, () => { console.log(`Server is running on ${PORT} port`) });
