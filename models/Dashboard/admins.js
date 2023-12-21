const client = require("../../db");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

async function register(req, res) {
  let { name, department, username, password } = req.body;
  const hashPasswod = bcrypt.hashSync(password, 10);
  const result =
    await client.query(`INSERT INTO admins ( name,department,username, password)
    VALUES ('${name}', '${department}', '${username}', '${hashPasswod}') RETURNING *`);

  res.send({
    success: true,
    user: result.rows[0],
  });
}

async function login(req, res) {
  let { username, password } = req.body;

  const result = await client.query(
    `SELECT * FROM admins WHERE username = '${username}'`
  );

  if (result.rows.length === 0)
    res.send({ success: false, msg: "User not found" });
  else {
    let user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      var token = jwt.sign(user, "admins");
      res.send({ success: true, token, user });
    } else res.send({ success: false, msg: "Wrong password!" });
  }
}

module.exports = {
  register,
  login,
};
