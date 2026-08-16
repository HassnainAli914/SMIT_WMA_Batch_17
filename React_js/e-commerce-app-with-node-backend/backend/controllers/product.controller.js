const { addProduct, removeProduct, getProducts } = require("../modules/product.module");

exports.addProduct = async (name, price, userId) => {
  return await addProduct(name, price, userId);
};

exports.getProducts = async () => {
  return await getProducts();
};

exports.removeProduct = async (id, userId) => {
  return await removeProduct(id, userId);
};
