const { ObjectId, Mongoose, Types } = require("mongoose");
const Cart = require("../Model/cart");

const getCartItems = async (req, res) => {
  const userId = req.user._id;
  const cartsItemList = await Cart.find({ userId });
  console.log(cartsItemList);
  res.json({ cartItem: cartsItemList });
};
const postCartItem = async (req, res) => {
  const { name, price, description, image_url } = req.body;
  const userId = req.user._id;
  const cartItem = await Cart.findOne({
    name,
    price,
    description,
    image_url,
  });
  console.log("user id is", userId);

  if (cartItem) {
    console.log("exists");
    cartItem.quantity += 1;
    cartItem.totalPrice = cartItem.price * cartItem.quantity;
    await cartItem.save();
    return res.json({ data: "already exist" });
  }
  await Cart.create({
    userId,
    name,
    price,
    description,
    image_url,
    userId,
    quantity: 1,
    totalPrice: price,
  });
  res.json({ data: "item added" });
};
const deleteCartItem = async (req, res) => {
  const userId = req.user._id;
  // const id = new Types.ObjectId(itemId);
  // console.log("removing id", id);
  try {
    const itemId = req.params.itemId;
    const id = new Types.ObjectId(itemId);

    const cart = await Cart.find({});
    console.log("userId", id);
    console.log("cart", cart);
    await Cart.findByIdAndDelete({ _id: itemId });
    res.json({ message: "success" });
    console.log("remove donnnnnneee");
  } catch (error) {
    // await Cart.findOneAndDelete({ userId, items });
    // try {
    //   // Remove the specific item from the items array in the cart
    //   const item = await Cart.updateOne(
    //     { userId },
    //     { $pull: { items: { _id: id } } }
    //   );
    //   console.log("removed item sucessfully");
    //   res.json({ message: "Item removed from cart", removeItemId: id });
    // }
    // try {
    //   const result = await Cart.updateOne(
    //     { userId },
    //     { $pull: { items: { _id: new Types.ObjectId(itemId) } } }
    //   );

    //   if (result.nModified > 0) {
    //     console.log("Item removed successfully");
    //     res.json({ message: "Item removed from cart", removedItemId: itemId });
    //   } else {
    //     console.log("Item not found or not removed");
    //     res.json({ message: "Item not found or not removed" });
    //   }
    // }
    console.error(
      "Error removing item from cart cart.js controller file line 3",
      error
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const cartTotalPrice = async (req, res) => {
  // try {
  //   const CartItem = await Cart.find({ userId });
  //   const result = await CartItem.aggregate([
  //     {
  //       $group: {
  //         _id: "$name",
  //         total: { $sum: "$totalPrice" },
  //       },
  //     },
  //     {
  //       $group: {
  //         _id: null,
  //         totalAllProducts: { $sum: "$total" },
  //       },
  //     },
  //   ]);
  //   const totalPrices = result.length > 0 ? result[0].totalAllProducts : 0;
  //   res.json({ totalPrices });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ error: "Internal Server Error" });
  // }
  try {
    const cartItems = await Cart.find();

    console.log("Cart Items:", cartItems);

    if (cartItems.length === 0) {
      // Handle case where cartItems is empty
      res.json({ totalPrices: 0 });
      return;
    }

    const result = await Cart.aggregate([
      {
        $group: {
          _id: "$name",
          total: { $sum: "$totalPrice" },
        },
      },
      {
        $group: {
          _id: null,
          totalAllProducts: { $sum: "$total" },
        },
      },
    ]);

    console.log("Aggregation Result:", result);

    const totalPrices = result.length > 0 ? result[0].totalAllProducts : 0;

    res.json({ totalPrices });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getCartItems,
  postCartItem,
  deleteCartItem,
  cartTotalPrice,
};
