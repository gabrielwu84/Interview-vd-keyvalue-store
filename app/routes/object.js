let Obj = require('../models/object');

function postObject(req, res) {
    res.send('post request received');
}

function getObject(req, res) {
	res.send('get request received')
}

module.exports = { getObject, postObject };