const express = require("express");
const app = express();
const port = 3000;
const products = require("./routers/Dashboard/products");
const admin = require("./routers/Dashboard/admins");
const order = require("./routers/Dashboard/orders");
const user = require("./routers/Client/users");
const checkAuthA = require("./middleware/middlewareAdmins");
const fileUpload = require("express-fileupload");
const { uploadFile } = require("@uploadcare/upload-client");
app.use(express.static("files"));

const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/upload", function (req, res) {
  req.files.file.mv(`files/${req.files.file.name}`, (err) => {
    if (!err) res.send("File uploaded");
    else res.send({ err, msg: "File not uploaded" });
  });
});

app.post("/api/v1/upload", async function (req, res) {
  const result = await uploadFile(req.files.file.data, {
    publicKey: process.env.publicKey,
    store: "auto",
    metadata: {
      subsystem: "uploader",
      pet: "cat",
    },
  });

  res.send(result);
});

app.use("/api/v1/admin", admin);
app.use("/api/v1/products", checkAuthA, products);
app.use("/api/v1/orders", checkAuthA, order);
app.use("/api/v1/users", user);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
