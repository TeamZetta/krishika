import api from "./common";

export async function getNearestMandi(district) {
  return await api.get(`/bazars/${district}`);
}
