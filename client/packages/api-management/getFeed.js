import api from "./common";

export async function getFeed(token) {
  return await api.get("/FEED/threads", {
    headers: { Authorization: `Bearer ${token}` },
  });
}
