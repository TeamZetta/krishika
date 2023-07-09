import api from "./common";

export async function getForum(token) {
  return await api.get("FORUM/threads", {
    headers: { Authorization: `Bearer ${token}` },
  });
}
