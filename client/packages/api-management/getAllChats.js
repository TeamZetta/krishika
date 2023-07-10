import api from "./common";

export async function getAllChats(token) {
  return await api.get("/chat", {
    headers: { Authorization: `Bearer ${token}` },
  });
}
