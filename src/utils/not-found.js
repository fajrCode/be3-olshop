import * as response from "./response.js";

const notFound = (req, res) => {
  response.res404("Sorry URL is not exist", res);
};

export default notFound;
