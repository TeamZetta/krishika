import api from "./common";
export async function forumComment(token, content, threadId) {
  return await api.post(
    "/comment",
    { content, threadId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}
