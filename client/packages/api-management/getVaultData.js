import api from "./common";

export async function getVaultData(token) {
  return await api.get("/chat", {
    headers: { Authorization: `Bearer ${token}` },
  });
}