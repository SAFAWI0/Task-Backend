const express = require('express')
const app = express()
const port = 3000
const products = require("./routers/Dashboard/products");
const admin = require("./routers/Dashboard/admins");
const order = require("./routers/Dashboard/orders");
const user = require("./routers/Client/users")

const checkAuthA = require("./middleware/middlewareAdmins");
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})




app.use("/api/v1/admin", admin);
app.use("/api/v1/products",checkAuthA, products);
app.use("/api/v1/orders",checkAuthA, order);



app.use("/api/v1/users", user);





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})