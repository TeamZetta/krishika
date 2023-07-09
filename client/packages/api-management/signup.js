import api from "./common";
export async function signup() {
  return await api.post("/signup", data);
}
