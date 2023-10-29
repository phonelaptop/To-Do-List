const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = 3001;

app.use(express.json());
app.use(express.static("./public"))

const contener = [];

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.post("/todolist", (req, res) => {
    console.log(req.body);

    contener.push(req.body)

    res.json(contener);
});

app.delete("/todolist/:id", (req, res) => {
    console.log("*****",req.params.id);
    contener.splice(req.params.id, 1);
    console.log("*****",contener);

    res.json(contener);
});


app.listen(PORT, () => {
    console.log(`Listening on ${PORT} ...`)
});
