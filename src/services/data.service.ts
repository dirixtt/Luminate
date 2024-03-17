import axios from "axios";
import { Idea } from "../Types/Types";

class authService {
  async getData() {
    return axios.get<Idea[]>("https://api.npoint.io/99bd2edbdd795c9fa3a3");
  }
}
export default new authService();