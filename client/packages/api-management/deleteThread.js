import api from "./common";
export async function deleteThread(token, threadId) {
  console.log(threadId);
  return await api.delete(
    `/FORUM/deleteThread/${threadId}`,
 
    {
      headers: { Authorization: `Bearer ${token}` },
     
    }
  );
}
