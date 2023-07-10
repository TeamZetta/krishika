import api from "./common";
export async function changeQty(token, qty) {
  return await api.put(
    "/setCrop",
    { cropQuantity: qty },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}
