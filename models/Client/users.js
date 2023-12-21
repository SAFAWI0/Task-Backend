const client = require("../../db");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

async function register(req, res) {
  let { name, phone, username, password } = req.body;
  const hashPasswod = bcrypt.hashSync(password, 10);
  const result =
    await client.query(`INSERT INTO users ( name,phone,username, password)
    VALUES ('${name}', '${phone}', '${username}', '${hashPasswod}') RETURNING *`);

  res.send({
    success: true,
    user: result.rows[0],
  });
}

async function login(req, res) {
  let { username, password } = req.body;
  const result = await client.query(
    `SELECT * FROM users WHERE username = '${username}'`
  );
  if (result.rows.length === 0)
    res.send({ success: false, msg: "User not found" });
  else {
    let user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      var token = jwt.sign(user, "users");
      res.send({ success: true, token, user });
    } else res.send({ success: false, msg: "Wrong password!" });
  }
}



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





async function addOrders(req, res) {
  let { items, userID, address } = req.body;
  const result = await client.query(`INSERT INTO orders (items, userID,address)
    VALUES ('${items}', '${userID}', '${address}') RETURNING items, userID,address `);
  res.send(result.rows);
}

module.exports = {
  register,
  login,
  getProducts,
  addOrders,
};
