var express = require('express')
var app = express();
var fs = require('fs');

var publicDir = require('path').join(__dirname, '/public');
app.use(express.static(publicDir));

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

const cons = require('consolidate');
const engines = require('consolidate');
app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
    let currentDate = new Date();
    fs.readFile(fileName, 'utf8', function(err, data) {
            let ds = data.split('\n');
            let result = [];
            for (i = 0; i < data.length; i++) {
                let nameX = ds[i].split(';')[0];
                let emailX = ds[i].split(';')[1];
                result.push({ name: nameX, email: emailX });
                res.render('index', { model: result });
            }
        })
        // res.render('index', { model: currentDate });

})

app.get('/register', function(req, res) {
    res.render('register');
})
var fileName = 'user.txt';
app.post('/doRegister', function(req, res) {
    let name = req.body.txtName;
    let email = req.body.txtEmail;
    let data = name + ';' + email + '\n';
    fs.appendFile(fileName, email, function(error) {
        res.render('/');
    })

})
var sever = app.listen(9000);