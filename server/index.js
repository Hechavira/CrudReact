const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "UsuariosCrud"
});

app.post("/create",(req,res)=>{
    const nombre = req.body.nombre;
    const apellidoP = req.body.apellidoP;
    const apellidoM = req.body.apellidoM;
    const edad = req.body.edad;
    const sexo = req.body.sexo;
    const calle = req.body.calle;
    const numInt = req.body.numInt;
    const numExt = req.body.numExt;
    const colonia = req.body.colonia;
    const municipio = req.body.municipio;
    const estado = req.body.estado;
    const intpers = req.body.intpers;
    const tipHab = req.body.tipHab;
    const ingMens = req.body.ingMens;
    const viajes = req.body.viajes;



    db.query("INSERT INTO usuarios(nombre,apellidoP,apellidoM,edad,sexo,calle,numInt,numExt,colonia,municipio,estado,intpers,tipHab,ingMens,viajes) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[nombre,apellidoP,apellidoM,edad,sexo,calle,numInt,numExt,colonia,municipio,estado,intpers,tipHab,ingMens,viajes],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.get("/usuarios",(req,res)=>{


    db.query("SELECT * FROM usuarios",
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.put("/update",(req,res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const apellidoP = req.body.apellidoP;
    const apellidoM = req.body.apellidoM;
    const edad = req.body.edad;
    const sexo = req.body.sexo;
    const calle = req.body.calle;
    const numInt = req.body.numInt;
    const numExt = req.body.numExt;
    const colonia = req.body.colonia;
    const municipio = req.body.municipio;
    const estado = req.body.estado;
    const intpers = req.body.intpers;
    const tipHab = req.body.tipHab;
    const ingMens = req.body.ingMens;
    const viajes = req.body.viajes;

    db.query("UPDATE usuarios SET nombre=?,apellidoP=?,apellidoM=?,edad=?,sexo=?,calle=?,numInt=?,numExt=?,colonia=?,municipio=?,estado=?,intpers=?,tipHab=?,ingMens=?, viajes=? WHERE id=?",[nombre,apellidoP,apellidoM,edad,sexo,calle,numInt,numExt,colonia,municipio,estado,intpers,tipHab,ingMens,viajes,id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});


app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id;


    db.query("DELETE FROM usuarios WHERE id=?",id,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});
app.listen(3001,()=>{
    console.log("Puerto 3001");
})
