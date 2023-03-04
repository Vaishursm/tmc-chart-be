const express = require("express");
const router = express.Router();

//importing controller code to map with the routes
const tmcdata = require("./controllers/processedData");

router.post("/api/tmcdata", tmcdata);

module.exports = router