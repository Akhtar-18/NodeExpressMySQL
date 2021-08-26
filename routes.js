exports.add = function(req, res){
    message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var name= post.user_name;
      var pass= post.password;
      var fname= post.first_name;
      var lname= post.last_name;
      var mob= post.mob_no;
 
	  if (!req.files)
				return res.status(400).send('No files were uploaded.');
 
		var file = req.files.uploaded_image;
		var img_name=file.name;
 
	  	 if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                                 
              file.mv('public/images/upload_images/'+file.name, function(err) {
                             
	              if (err)
 
	                return res.status(500).send(err);
      					var sql = "INSERT INTO `users`(`first_name`,`last_name`,`mob_no`,`user_name`, `password` ,`image`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "','" + img_name + "')";
 
    						var query = db.query(sql, function(err, result) {
    							 //res.redirect('profile/'+result.insertId);
                          res.redirect('/');
    						});
					   });
          } else {
            message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
            res.render('add.ejs',{message: message});
          }
   } else {
      res.render('add.ejs');
   }
 
};

exports.edit = function(req, res){
   const userId = req.params.id;
   let sql = `Select * from users where id = ${userId}`;
   db.query(sql, function(err, result){
       res.render('edit', {
           user : result[0]
       });
   });
};

exports.update = function(req, res){
   const userId = req.body.id;
   let sql = "Update users SET first_name='"+req.body.first_name+"',  last_name='"+req.body.last_name+"',  mob_no='"+req.body.mob_no+"', user_name='"+req.body.user_name+"', password='"+req.body.password+"' where id ="+userId;
   db.query(sql, function(err, results){
       res.redirect('/');
   });
};

exports.delete = function(req, res){
   const userId = req.params.id;
   let sql = `Delete from users where id = ${userId}`;
   db.query(sql, function(err, results){
       res.redirect('/');
   });
};


exports.profile = function(req, res){
	var message = '';
	var id = req.params.id;
    var sql="SELECT * FROM `users` WHERE `id`='"+id+"'"; 
    db.query(sql, function(err, result){
	  if(result.length <= 0)
	  message = "Profile not found!";
	  
      res.render('profile.ejs',{data:result, message: message});
   });
};


exports.show = function(req, res){
   // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
   var message = '';
   var sql = "SELECT * FROM users";
   db.query(sql, function(err, rows){
      if(rows.length <= 0)
      message = "Rows not found!";
      
       res.render('index.ejs',{users:rows, message:message});
    });
};