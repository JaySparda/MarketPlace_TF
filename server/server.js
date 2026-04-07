const express = require("express");
const app = express();
const connectDB = require("./connection");
const port = 5000;
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use("/users", require("./controllers/users"));
app.use("/products", require("./controllers/products"));
app.use("/carts", require("./controllers/carts"));
app.use("/orders", require("./controllers/orders"));
app.use("/reviews", require("./controllers/reviews"));

connectDB();
app.listen(port, () => console.log(`App is flying on port: ${port}`));
