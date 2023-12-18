const client = require("../../db");

async function getOrders(req, res) {
    const result = await client.query(`SELECT * FROM orders`);
    res.send(result.rows);
  }

  async function changStaus(req, res) {
    let id = req.params.id;
    let { status } = req.body;
    const result = await client.query(`UPDATE orders
    SET  status = '${status}' 
    WHERE id = ${id} RETURNING *`);
    res.send(result.rows);
  }



  module.exports = {
    getOrders,
    changStaus,

  };
  