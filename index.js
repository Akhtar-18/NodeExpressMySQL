var express = require('express');
var routes = require('./routes');
var path = require('path');
var fileUpload = require('express-fileupload');
var app = express();
var mysql = require('mysql');
var bodyParser=require("body-parser");
	
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'nodefileupload'
});
 
connection.connect(function(err) {
	if (err) throw err;
	console.log('Database is connected successfully !');
  });

 
global.db = connection;
 
// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
 
// development only
 
app.get('/', routes.show);//call for main index page
app.get('/add', routes.add);//call for signup post 
app.post('/', routes.add);//call for signup post 
app.get('/view/:id',routes.profile);
app.get('/edit/:id',routes.edit);
app.post('/update',routes.update);
app.delete('/delete/:id',routes.update);
app.get('/showusers',routes.show);
//Middleware
app.listen(8080)