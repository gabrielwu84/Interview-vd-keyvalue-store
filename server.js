let express = require('express');
let app = express();
let port = 3000;

app.get("/", (req, res) => res.json({message: "VD key-value store"}));
app.listen(port);
console.log("Listening on port " + port);

module.exports = app; 