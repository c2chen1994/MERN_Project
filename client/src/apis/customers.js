import axios from "axios";

export default axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://mernproject-2019.herokuapp.com/api/customers"
      : "http://localhost:3000/api/customers"
});
