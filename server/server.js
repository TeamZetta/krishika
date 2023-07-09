const app = require("./app")
const { PORT } = require("./config")

// connect db
require("./config/db")

app.listen(PORT, () => {
  console.log(`[+] Server is running on port ${PORT}`)
})
