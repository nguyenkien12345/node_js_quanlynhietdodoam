const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

function connectDatabase() {
    const conn = mongoose.createConnection(process.env.MONGODB_URL);

    conn.on('open', function (err) {
        console.log('Database is open');
        if (err) {
            mongoose.connection.close();
        }
    });

    conn.on('connected', function (err) {
        console.log('Database is connected');
        if (err) {
            mongoose.connection.close();
        }
    });

    conn.on('disconnected', function () {
        console.log('Database is disconnected');
        mongoose.connection.close();
    });

    conn.on('close', function () {
        console.log('Database is close');
        mongoose.connection.close();
    })

    conn.on('error', function (err) {
        console.log('connect database failure: ', err);
        if (err) {
            mongoose.connection.close();
        }
    });

    process.on('SIGINT', async () => {
        await conn.close();
        process.exit(0);
    })

    return conn;
};

const connection = connectDatabase();

module.exports = { connection }
