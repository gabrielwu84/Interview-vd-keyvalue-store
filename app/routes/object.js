let Obj = require('../models/object');

function postObject(req, res) {
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
    let reqTimestamp;
    if( typeof (req.query.timestamp) != 'undefined' ){
        reqTimestamp = new Date(parseInt(req.query.timestamp))
    } else {
        reqTimestamp = new Date()
    }
    Obj.find({ key: req.params.key , timestamp:{$lte: reqTimestamp} })
        .sort( { timestamp: -1 } )
        .limit(1)
        .then((obj) => {
            res.json({"value":obj[0].value})        
        })
}

module.exports = { getObject, postObject };