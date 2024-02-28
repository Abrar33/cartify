const Product = require("../Model/product");
async function getProducts(req, res) {
  const product = await Product.find({});
  // res.status(200).json({ message: "Products here" })
  res.json(product);
}
async function addNewProduct(req, res) {
  const { name, description, price, category, subCategory } = req.body;
  const imageUrl = req.file ? req.file.filename : null;
  if (subCategory === null) {
    const product = await Product.create({
      name,
      description,
      price,
      category,
      image_url: imageUrl,
    });

    if (product) {
      console.log(product);
      res.status(201).json({ sucess: true, message: "added" });
    }
  } else {
    const product = await Product.create({
      name,
      description,
      price,
      category,
      subCategory,
      image_url: imageUrl,
    });
    if (product) {
      console.log(product);
      res.status(201).json({ sucess: true, message: "added" });
    }
  }
}
async function productCategoryQuery(req, res) {
  const { category, subCategory } = req.params;
  try {
    let query = { category: category };

    if (subCategory !== undefined) {
      query.subCategory = subCategory;
    }
    if (subCategory) {
      query = { category, subCategory };
    }
    console.log(query.subCategory, "query subCategory");
    const prods = await Product.find(query);
    res.json(prods);
  } catch (error) {
    console.error("Error querying products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
  // if (subCategory === undefined) {
  //   const prods = await Product.find({ category: category });
  //   res.json({ prods });
  // }
  //   const prods = await Product.find({
  //     category: category,
  //     subCategory: subCategory,
  //   });
  //   res.json(prods);
  //   console.log(subCategory);
}
module.exports = {
  getProducts,
  addNewProduct,
  productCategoryQuery,
};

/*
 */
