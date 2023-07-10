import api from "./common";

export async function getUserVault(token) {
  return await api.get("/getcrop", {
    headers: { Authorization: `Bearer ${token}` },
  });
}


export async function setUserVault(token, cropQuantiy) {
    return await api.get("/setcrop", {
      headers: { Authorization: `Bearer ${token}` },
      params: { cropQuantiy },
    });
  }
  
  