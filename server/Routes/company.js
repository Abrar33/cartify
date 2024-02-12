const express = require("express");
const { getCompany } = require("../Controller/company");
const router = express.Router();
router.post("/new", getCompany);
module.exports = router;
