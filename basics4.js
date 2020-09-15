var express = require('express');
const app = express();
var mysql = require('mysql');

var bodyparser = require('body-parser');

var connection = mysql.createConnection({
 host:"localhost",
 user:"root",
 password:"",
 database:'userdata'
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.post('/register/',(req,res,next)=>{

    var data = req.body;
    var password = data.password;
    var email=data.email;

    console.log(email+"  "+password);
    

    connection.query("SELECT* FROM login_info WHERE email = ?",[email],function(err,result,fields){
        connection.on('error',(err)=>{
            console.log("[MySQL ERROR]",err);
    });

    if(result && result.length){
        res.json("User already exist.");
    }
    else{
        var insert_cmd = "INSERT INTO login_info(email,password) values (?,?)";
        values = [email,password];

        console.log("executing: "+insert_cmd+" "+values);
        connection.query(insert_cmd,values,(err,results,fiels)=>{
           connection.on('err',(err)=>{
               console.log('[MySQL ERROR]',err);
        });
        res.json("Registered!!");
        console.log("Registration Successful.");
        });
    }

    });
});

app.post("/login/",(req,res,next)=>{
    var data = req.body;
    var email = data.email;
    var password = data.password;

    connection.query("SELECT * FROM login_info WHERE email = ?",[email], (err,result,fields)=>{
         connection.on('error',(err)=>{
             console.log("[MySQL ERROR]",err);
         });
       
         if(result&&result.length){
             console.log(result);
             if(password==result[0].password){
                 res.json("User logged in");
                 res.end;
             }
             else{
                 res.json("Wrong Password.");
                 res.end;
             }
         }
         else{
             res.json("User not found.");
             res.end;
         }
        }); 

});
var server = app.listen(3000,()=>{
    console.log("Server running at http://localhost:3000");
    });