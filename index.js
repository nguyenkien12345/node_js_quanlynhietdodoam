const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const os = require('os');
require('./connect/index');
const DataRouter = require('./router/DataRouter');

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(helmet());
app.use(express.json())

app.use('', DataRouter);

const PORT = process.env.PORT || 80000;
app.listen(process.env.PORT, () => {
    console.log(`App is listening at port ${PORT} in ${os.hostname()}`);
});
