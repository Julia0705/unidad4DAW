const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

let concesionarios = [];

// Endpoints para concesionarios
app.get("/concesionarios", (req, res) => {
  res.json(concesionarios);
});

app.post("/concesionarios", (req, res) => {
  const nuevoConcesionario = req.body;
  concesionarios.push(nuevoConcesionario);
  res.json(nuevoConcesionario);
});

app.get("/concesionarios/:id", (req, res) => {
  const concesionario = concesionarios.find((c) => c.id === req.params.id);
  res.json(concesionario);
});

app.put("/concesionarios/:id", (req, res) => {
  const index = concesionarios.findIndex((c) => c.id === req.params.id);
  concesionarios[index] = req.body;
  res.json(req.body);
});

app.delete("/concesionarios/:id", (req, res) => {
  concesionarios = concesionarios.filter((c) => c.id !== req.params.id);
  res.json({ message: "Concesionario eliminado correctamente" });
});

// Endpoints para coches
app.get("/concesionarios/:id/coches", (req, res) => {
  const concesionario = concesionarios.find((c) => c.id === req.params.id);
  res.json(concesionario.coches);
});

app.post("/concesionarios/:id/coches", (req, res) => {
  const concesionario = concesionarios.find((c) => c.id === req.params.id);
  const nuevoCoche = req.body;
  concesionario.coches.push(nuevoCoche);
  res.json(nuevoCoche);
});

app.get("/concesionarios/:id/coches/:cocheId", (req, res) => {
  const concesionario = concesionarios.find((c) => c.id === req.params.id);
  const coche = concesionario.coches.find((c) => c.id === req.params.cocheId);
  res.json(coche);
});

app.put("/concesionarios/:id/coches/:cocheId", (req, res) => {
  const concesionario = concesionarios.find((c) => c.id === req.params.id);
  const cocheIndex = concesionario.coches.findIndex((c) => c.id === req.params.cocheId);
  concesionario.coches[cocheIndex] = req.body;
  res.json(req.body);
});

app.delete("/concesionarios/:id/coches/:cocheId", (req, res) => {
  const concesionario = concesionarios.find((c) => c.id === req.params.id);
  concesionario.coches = concesionario.coches.filter((c) => c.id !== req.params.cocheId);
  res.json({ message: "Coche eliminado correctamente" });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
