const client = require("../../db");

async function getProducts(req, res) {
  let search = req.query.search || "";
  let page = parseInt(req.query.page) || 1;
  const PAGE_SIZE = 5;
  const offset = (page - 1) * PAGE_SIZE;
  const result = await client.query(
    `SELECT * FROM products WHERE CONCAT(name, price, discount,active ) ILIKE '%${search}%' LIMIT ${PAGE_SIZE} OFFSET ${offset} `
  );

  res.send(result.rows);
}

async function addProducts(req, res) {
  let { name, price, discount, image, active } = req.body;
  const result =
    await client.query(`INSERT INTO products (name, price,discount,image,active)
  VALUES ('${name}', '${price}', '${discount}', '${image}', '${active}') RETURNING *`);
  res.send(result.rows);
}

async function updateProducts(req, res) {
  let id = req.params.id;
  let { name, price, discount, image, active } = req.body;
  const result = await client.query(`UPDATE products
  SET name = '${name}' , price = '${price}' , discount = '${discount}', image = '${image}', active = '${active}'
  WHERE id = ${id} RETURNING *`);
  res.send(result.rows);
}

async function deleteProducts(req, res) {
  let id = req.params.id;
  const result = await client.query(`DELETE FROM products
  WHERE id = ${id} RETURNING *`);
  res.send(result.rows);
}

module.exports = {
  getProducts,
  addProducts,
  updateProducts,
  deleteProducts,
};
