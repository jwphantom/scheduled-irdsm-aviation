const cron = require("node-cron");
const morgan = require("morgan");
const db = require("./models/db");

//declaration app express
const express = require("express");
const app = express();

//declaration cors
const cors = require("cors");
app.use(cors({ origin: "*" }));

//declaration http
const http = require("http");
const server = http.Server(app);

// Set middlewares
app.use(express.json());
app.use(morgan("dev"));

//declaration body parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//import admission function
const admissionFunctions = require("./function/splitAdmission");

//initialisation du port
const port = process.env.PORT || 3001;

//script cron job qui va s'executer chaque Lundi, Mercredi et Vendredi à 01H GMT+00
cron.schedule("0 1 * * 1,3,5", function () {
    console.log("---------------------");
    console.log(`running a task at ${new Date()}`);
    Manage();
});

//appel de la fonction qui fait le travail de découpage
async function Manage() {
    admissionFunctions.splitAdmission();
}

app.get("/", function (req, res) {
    res.setHeader("Content-Type", "text/plain");
    res.send("Vous êtes à l'accueil");
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});
