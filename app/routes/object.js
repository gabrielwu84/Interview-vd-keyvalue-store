let Obj = require('../models/object');

function postObject(req, res) {
    // res.send('post request received');
    // grab the first instance of key-value pair, 
    // ignore other key-value pairs.
    let [key, value] = Object.entries(req.body)[0];
    let newObject = new Obj({
        key: key,
        value: value,
    });
    newObject.save((err,obj) => {
        if(err) {
            res.send(err);
        } else { //If no errors, send it back to the client
            res.json({key:obj["key"],value:obj["value"],timestamp:obj["timestamp"].getTime()});
        }
    });
}

function getObject(req, res) {
	res.send('get request received')
}

module.exports = { getObject, postObject };