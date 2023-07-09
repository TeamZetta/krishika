export default async function userLoggedIn() {
  if (typeof window !== undefined) {
    await localStorage.setItem("userStatus", "{userLoggedIn:true}");
  }
}
