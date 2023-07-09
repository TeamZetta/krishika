const mongoose = require("mongoose");
const { DB_URI } = require("../config");

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => {
    console.log(`[+] MongoDB connected : ${conn.connection.host}`);
  })
  .catch((e) => {
    console.log(`[x] Connection failed! ${e.message}`);
    process.exit();
  });
