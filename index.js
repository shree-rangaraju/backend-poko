const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const routes = require("./routes/router");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", routes);

const { PORT } = process.env || 3001;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
