const express = require("express");
const bodyParser = require("body-parser");

//Local Imports
const routeconfig = require("./routeconfig");
const routes = require("./routes");

//defining ports
const PORT = process.env.PORT || 8000;

//creating a express app using express function
const app = express();

//getting params as json
app.use(express.json());

//allowing cors access
if (process.env.node_env === 'development') {
const cors = require("cors");
app.use(cors());
}

// Register body parser middleware to process request body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Registering the routes middleware
app.use(routeconfig.baseUrl, routes);

app.listen(PORT);