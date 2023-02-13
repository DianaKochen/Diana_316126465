const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const routes = require('./routes');
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({extended: true}));
app.use(routes);

app.use(express.static(__dirname + '/views'));
app.use("/views", express.static(__dirname + '/views'));
app.use("/static", express.static(__dirname + "/static"));
app.use("/CSS", express.static(__dirname + "/static/CSS"));
app.use("/Graphics", express.static(__dirname + "/static/Graphics"));
app.use("/JS", express.static(__dirname + "/static/JS"));

app.listen(port,() => {
    console.log ("server is running on port" + port)
})