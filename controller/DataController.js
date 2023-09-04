const { validateData, sentSuccessResponse, sentErroresponse } = require('../common/response');
const { data, regexData } = require('../constant/index');
const Data = require('../model/data');
const moment = require('moment');

const DataController = {
    add: async (req, res) => {

        const { temperature, humidity, dust, air } = req.body;

        if (!temperature) return res.status(400).json(validateData('Please enter temperature'));
        if (!humidity) return res.status(400).json(validateData('Please enter humidity'));
        if (isNaN(temperature)) return res.status(400).json(validateData('temperature must be number'));
        if (isNaN(humidity)) return res.status(400).json(validateData('humidity must be number'));

        const date = moment().add(7, 'hours').format('DD/MM/YYYY');
        const time = moment().add(7, 'hours').format('HH:mm:ss');

        try {
            const result = new Data({
                temperature: temperature,
                humidity: humidity,
                dust: dust ? dust : "",
                air: air ? air : "",
                date: date,
                time: time
            });
            await result.save()
                .then((data) => {
                    return res.status(200).json(sentSuccessResponse(data, 'Add Success'));
                })
                .catch((error) => {
                    return res.json(sentErroresponse(error, 'Add Fail'));
                })
        }
        catch (error) {
            return res.json(sentErroresponse(error, error.message));
        }
    },

    list: async (req, res) => {
        try {
            const result = await Data.find({ active: true });
            let object = {
                data: result,
                length: result.length
            };
            return res.status(200).json(sentSuccessResponse(object, 'Get List Success'));
        }
        catch (error) {
            return res.json(sentErroresponse(error, error.message));
        }
    },

    detail: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await Data.findById(id);
            if (result) {
                return res.status(200).json(sentSuccessResponse(result, 'Get Detail Success'));
            }
            else {
                return res.json(sentErroresponse(null, 'Data is not found'));
            }
        }
        catch (error) {
            return res.json(sentErroresponse(error, error.message));
        }
    },

    update: async (req, res) => {

        const { temperature, humidity, dust, air, id } = req.body;

        if (!id) return res.status(400).json(validateData('Please enter id'));
        if (!temperature) return res.status(400).json(validateData('Please enter temperature'));
        if (!humidity) return res.status(400).json(validateData('Please enter humidity'));

        if (isNaN(temperature)) return res.status(400).json(validateData('temperature must be number'));
        if (isNaN(humidity)) return res.status(400).json(validateData('humidity must be number'));

        const date = moment().add(7, 'hours').format('DD/MM/YYYY');
        const time = moment().add(7, 'hours').format('HH:mm:ss');

        try {
            const oldData = await Data.findOne({ _id: id });

            if (!oldData) {
                return res.json(sentErroresponse(null, 'Data is not found'));
            };

            oldData.temperature = temperature;
            oldData.humidity = humidity;
            oldData.dust = dust ? dust : oldData.dust;
            oldData.air = air ? air : oldData.air;
            oldData.date = date;
            oldData.time = time;

            await oldData.save()
                .then((data) => {
                    return res.status(200).json(sentSuccessResponse(data, 'Update Success'));
                })
                .catch((error) => {
                    return res.json(sentErroresponse(error, error.message));
                })
        }
        catch (error) {
            return res.json(sentErroresponse(error, error.message));
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await Data.findByIdAndDelete(id);
            if (result) {
                return res.status(200).json(sentSuccessResponse(result, 'Delete Success'));
            }
            else {
                return res.json(sentErroresponse(null, 'Delete Fail'));
            }
        }
        catch (error) {
            return res.json(sentErroresponse(error, error.message));
        }
    }
};

module.exports = DataController;
