import "dotenv/config";
import app from "./app.js";
import Users from "./models/users.js";

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running in ${process.env.DOMAIN}`);
});
