import api from "./common";
export async function login(phonenumber) {
  return await api.post("/login", {
    phoneNumber: "91" + phonenumber,
  });
}
