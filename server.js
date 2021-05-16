let express = require('express');
let app = express();
let port = 3000;
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let obj = require('./app/routes/object');

// db options
let options = {
    useNewUrlParser: true ,
    useUnifiedTopology: true
};
// db connection
mongoose.connect("mongodb://localhost:27017/object", options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

app.get("/", (req, res) => res.json({message: "VD key-value store"}));
app.route("/object").post(obj.postObject);
app.route("/object/:key").get(obj.getObject)

app.listen(port);
console.log("Listening on port " + port);

module.exports = app; 