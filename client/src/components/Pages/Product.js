import { useEffect, useState } from "react";

import axios from "axios";

import { useUserContext } from "../../Store/context";
import { jwtDecode } from "jwt-decode";
export default function Products() {
  const [open, setOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cart, setCart] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const { user } = useUserContext();
  // Function to fetch products based on category and subcategory
  const fetchProductsByCategoryAndSubcategory = async () => {
    try {
      // Fetch products based on selected category and subcategory
      const response = await axios.get(
        `http://localhost:8000/api/v1/products/${selectedCategory}/${selectedSubcategory}`
      );
      setProducts(response.data);
      // console.log(
      //   `Products for ${selectedCategory}/${selectedSubcategory} are:`,
      //   response
      // );
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Update the products when selected category or subcategory changes
  useEffect(() => {
    fetchProductsByCategoryAndSubcategory();
  }, [selectedCategory, selectedSubcategory]);

  useEffect(() => {
    // Fetch all products initially
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/products"
        );
        setProducts(response.data);
        console.log("Products are:", response);
      } catch (error) {
        console.error("Error fetching all products:", error);
      }
    };

    fetchAllProducts();
  }, []);
  const handleCart = async (product) => {
    const token = localStorage.getItem("token");

    const decodedToken = jwtDecode(token);

    setCart([...cart, product]);
    console.log("user", decodedToken);
    await axios
      .post("http://localhost:8000/cart/add", product, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(product);
  };
  return (
    <div className="bg-white">
      <button>Add New</button>
      {/* ... (previous code) */}

      {/* Dropdowns for Category and Subcategory */}
      <div className="flex space-x-4 my-4">
        <select
          className="p-2 border border-gray-300 rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="random">random</option>

          {/* Add more categories as needed */}
        </select>

        <select
          className="p-2 border border-gray-300 rounded"
          value={selectedSubcategory}
          onChange={(e) => setSelectedSubcategory(e.target.value)}
        >
          <option value="">Select Subcategory</option>
          <option value="shirts">Shirts</option>
          <option value="pants">Pants</option>
          <option value="Tops">Tops</option>
          {/* Add more subcategories as needed */}
        </select>
      </div>

      <section className="py-16">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((item, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg">
              <img
                src={`http://localhost:8000/uploads/${item.image_url}`}
                alt={item.name}
                className="w-full h-auto object-cover mb-2"
              />
              <h2 className="text-lg font-medium text-gray-800">{item.name}</h2>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="text-lg font-semibold text-indigo-600">
                ${item.price}
              </p>
              <button
                className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md"
                onClick={() => {
                  handleCart(item);
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
