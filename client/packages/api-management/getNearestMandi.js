import api from "./common";

export async function getNearestMandi(district, lang) {
  console.log(district)
  if (lang === "bn") {
    return await api.get(`/bazars/en/bn/${district}`);
  } else {
    return await api.get(`/bazars/bn/en/${district}`);
  }
}
