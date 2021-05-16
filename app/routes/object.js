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
	// res.send('get request received')
    Obj.find({ key: req.params.key })
        .sort( { timestamp: -1 } )
        .limit(1)
        .then((obj) => {
            res.json({"value":obj[0].value})        
        })
}

module.exports = { getObject, postObject };