const Company = require("../Model/company");

const getCompany = async (req, res) => {
  const { name, description } = req.body;
  const company = await Company.create({ name, description });
  res.status(201).json({ sucess: true });
};
module.exports = {
  getCompany,
};
