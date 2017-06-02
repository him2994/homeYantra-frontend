var express = require('express'),
app = express();

app.use(express.static(__dirname + '/app'));
app.get('/', function(req, res) {
    res.sendfile('index.html', {root: __dirname + '/app'})
});
var server = app.listen(process.env.PORT || 5000);
