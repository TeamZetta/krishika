import api from "./common";

export async function getForumThread(token, id) {
  return await api.get(`/threads/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
