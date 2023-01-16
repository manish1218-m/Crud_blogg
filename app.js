const express = require("express");
var mysql = require("mysql");
const bodyParser= require("body-parser")
const app = express();

// -----bodyParser-----//
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// -----embedded javascript---//
app.set('view engine','ejs')

app.get('/',(req,res) => {
    res.render("insert");
});
// ------CREATE data-----//
app.post('/insert',(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var destination = req.body.destination;

    var sql= `INSERT INTO details(name, email, destination) VALUES ("${name}","${email}","${destination}")`;
    con.query(sql,(err,results)=>{
       if(err) throw err;
       res.redirect("/show");
    });

});

// -----READ data-----//
app.get('/show',(req,res)=>{
    
    var sql = "SELECT * FROM details";
    con.query(sql,(err,results)=>{
        if (err) throw err;
        res.render("show",{details:results});
    });
    
});

// ------DELETE data------//
app.get('/delete/:id',(req,res)=>{
    var id = req.params.id;
    var sql= `DELETE FROM details WHERE id='${id}'`;

    con.query(sql,(err,results) =>{
        if(err) throw err;
        res.redirect('/show');
    });
});

// -----UPDATE data-----//
app.get('/change/:id',(req,res)=>{
    var id = req.params.id;
    var sql= `SELECT * FROM details WHERE id='${id}'`;

    con.query(sql,(err,results) =>{
        if(err) throw err;
        res.render('change',{details:results});
    });
});


app.post('/update/:id',(req,res)=>{

    var id= req.params.id;
    var name = req.body.name;
    var email = req.body.email;
    var destination = req.body.destination;

    var sql= `UPDATE details SET name= '${name}',email='${email}',destination='${destination}' WHERE id= '${id}'`;
    con.query(sql,(err,results)=>{
       if(err) throw err;
       res.redirect("/show");
    });

});


// ------ Connection to MYSQL database-----//
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Manishj#09",
    database:"passengers",
    port:"3307",
    multipleStatements: true
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

app.listen(3000,
    console.log("Server is running on 3000.."));
