import api from "./common";
export async function verifyOTP(token, code) {
  console.log(typeof token);
  return await api.get("/verifyOTP", {
    params: { code },
    headers: { Authorization: `Bearer ${token}` },
  });
}
