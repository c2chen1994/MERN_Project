import axios from "axios";
import Domain from "../Domain";

export default axios.create({
  baseURL: `${Domain}/api`
});
