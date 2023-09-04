const moment = require('moment');

const sentSuccessResponse = (data = null, message = 'success') => {
    return {
        data: data,
        message: message,
        status: true,
        date: moment().format("DD/MM/YYYY HH:mm:ss")
    }
};

const sentErroresponse = (error = null, message = 'fail') => {
    return {
        error: error,
        message: message,
        status: false,
        date: moment().format("DD/MM/YYYY HH:mm:ss")
    }
};

const validateData = (message = '') => {
    return {
        message: message,
        status: false,
        date: moment().format("DD/MM/YYYY HH:mm:ss")
    }
};

module.exports = { sentErroresponse, sentSuccessResponse, validateData };
