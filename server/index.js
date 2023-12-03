const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "doppler",
});

// parse application/json
app.use(bodyParser.json())
/*app.post("/create", (req, res) => {
    console.log(req);
    const {
      title,
      date,
      state,
      gender,
      specie,
      pheno,
      incidence,
      description,
    } = req.body;
    db.query('INSERT INTO projects(title,date,state,gender,specie,pheno,incidence,description) VALUES(?,?,?,?,?,?,?,?)',[title,date,state,gender,specie,pheno,incidence,description],
    (err,res)=>{
        if (err) {
            console.log(err);
        }else{
            res.send("Project Successfully Registered")
        }
    }
    );

  return res.status(200);
});*/
app.post("/create", (req, res) => {
    console.log(req.body.gender);
    const {
      title,
      date,
      state,
      gender,
      specie,
      pheno,
      incidence,
      description,
    } = req.body;
    db.query('INSERT INTO projects(title,date,state,gender,specie,pheno,incidence,description) VALUES(?,?,?,?,?,?,?,?)',[title,date,state,gender,specie,pheno,incidence,description],
    (err, result) => { // Cambié 'res' a 'result' para evitar conflictos de nombres
        if (err) {
            console.log(err);
            res.status(500).send("Error in database operation"); // Envía una respuesta de error al cliente
        } else {
            res.status(200).send("Project Successfully Registered"); // Envía una respuesta exitosa al cliente
        }
    });
});

app.get("/projects", (req, res) => {
  db.query('SELECT * FROM projects',
  (err, result) => {
      if (err) {
          console.log(err);
          res.status(500).send("Error in database operation"); // Envía una respuesta de error al cliente
      } else {
          res.send(result); // Envía una respuesta exitosa al cliente
      }
  });
});


app.put("/update", (req, res) => {
  const {
    id,
    title,
    date,
    state,
    gender,
    specie,
    pheno,
    incidence,
    description,
  } = req.body;
  db.query('UPDATE projects SET title=?,date=?,state=?,gender=?,specie=?,pheno=?,incidence=?,description=? WHERE id=?',[title,date,state,gender,specie,pheno,incidence,description,id],
  (err, result) => { // Cambié 'res' a 'result' para evitar conflictos de nombres
      if (err) {
          console.log(err);
          res.status(500).send("Error in database operation"); // Envía una respuesta de error al cliente
      } else {
          res.status(200).send("Project Successfully Updated"); // Envía una respuesta exitosa al cliente
      }
  });
});

app.delete("/delete/:id", (req, res) => {
  const {
    id
  } = req.params;
  db.query('DELETE FROM projects WHERE id=?',id,
  (err, result) => { // Cambié 'res' a 'result' para evitar conflictos de nombres
      if (err) {
          console.log(err);
          res.status(500).send("Error in database operation"); // Envía una respuesta de error al cliente
      } else {
          res.status(200).send(result); // Envía una respuesta exitosa al cliente
      }
  });
});

app.post("/partners", (req, res) => {
  console.log(req.body.gender);
  const {
    name,
    description
  } = req.body;
  db.query('INSERT INTO partners(name,description) VALUES(?,?)',[name,description],
  (err, result) => { // Cambié 'res' a 'result' para evitar conflictos de nombres
      if (err) {
          console.log(err);
          res.status(500).send("Error in database operation"); // Envía una respuesta de error al cliente
      } else {
          res.status(200).send("Partner Successfully Registered"); // Envía una respuesta exitosa al cliente
      }
  });
});

app.post("/collaborations", (req, res) => {
  const {
    partners_id,
    projects_id
  } = req.body;
  db.query('INSERT INTO partners(partners_id,projects_id) VALUES(?,?)',[partners_id,projects_id],
  (err, result) => { // Cambié 'res' a 'result' para evitar conflictos de nombres
      if (err) {
          console.log(err);
          res.status(500).send("Error in database operation"); // Envía una respuesta de error al cliente
      } else {
          res.status(201).send("Partner Successfully Registered good"); // Envía una respuesta exitosa al cliente
      }
  });
});

app.get("/partners", (req, res) => {
  db.query('SELECT * FROM partners',
  (err, result) => { // Cambié 'res' a 'result' para evitar conflictos de nombres
      if (err) {
          console.log(err);
          res.status(500).send("Error in database operation GET partners"); // Envía una respuesta de error al cliente
      } else {
        console.log(result)
        res.json(result)
      }
  });
});

app.listen(3001, () => {
  console.log("listening on 3001");
});
