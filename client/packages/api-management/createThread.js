import api from "./common";
export async function createForumThread(token, thread) {
  return await api.post(
    "/FORUM/createThread",
    { thread },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}
