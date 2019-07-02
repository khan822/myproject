var http = require ('http')
var express = require ("express")
var mysql = require ('mysql')
var bodyParser = require("body-parser");
var app=express();




app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var con = mysql.createConnection({
    host:"192.168.16.246",
    user:"allusers",
    password:"whdb@123",
    database:"imran_learning"

})
/*Global connection*/
 con.connect(function(err){

 if(!err) {
     console.log("Database is connected ... \n\n");  
 } else {
     console.log("Error connecting database ... \n\n");  
 }

})





/* insert employee*/
app.post("/insert",(req,res,next)=>{
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var username = req.body.username;

 var sql = "INSERT INTO employee (firstname, lastname, username) VALUES ('"+firstname+"', '"+lastname+"', '"+username+"')";

  con.query(sql, function (err, result) {
	 	res.send({
                     result:"successfully inserted"
         	    });
              //  console.log(result) 

                });
		
	})


/*select employee*/

app.post("/select",(req,res,next)=>{
con.query("SELECT * FROM `employee`",function (err,result,fields){

if(err) throw err;
res.json(result)
//console.log(result)
res.end();
//con.end();

});


});

app.post("/selectid",(req,res,next)=>{
var sql = con.query("SELECT * FROM employee WHERE id =?",[req.body.id],function (err,result,fields){
//console.log(sql);
if(err) throw err;
res.json(result)
//console.log("profile------->>>>"+result)
res.end();
//con.end();

})


})



app.post('/delete', function (req, res) {
  // console.log(req.body);
   con.query('DELETE FROM employee WHERE `id`=?', [req.body.id], function (error, results, fields) {
	//  if (error) throw error;
	res.json(results)
	  //res.end();

	});
});

app.post('/imagefile', function (req, res) {
var sql = con.query("INSERT INTO image (id, profile_img) VALUES ('null', '"+[req.body.img]+"')",function (err,result,fields){
if(err) throw err;
res.json(result)
//res.end();
console.log(result)
})
});


app.listen(9000, ()=>{
    console.log("server running on port 9000");
    });












