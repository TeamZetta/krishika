import api from "./common";

export async function getProfile(token, userId) {
  return await api.get("/getProfile", {
    headers: { Authorization: `Bearer ${token}` },
    params: { userId },
  });
}
