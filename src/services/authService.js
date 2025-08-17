const USERS = [
  {
    email: "user1@snackora.gmail.com",
    password: "user1@snackora",
    id: "user1"
  },
  {
    email: "user2@snackora.gmail.com",
    password: "user2@snackora",
    id: "user2"
  }
];
function hash(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

export function login(email, password) {
  const user = USERS.find(
    (u) => u.email === email && u.password === password
  );
  if (user) {
    localStorage.setItem("snackora_user", hash(user.id));
    return user.id;
  }
  return null;
}

export function logout() {
  localStorage.removeItem("snackora_user");
}

export function getCurrentUserId() {
  const hashId = localStorage.getItem("snackora_user");
  if (!hashId) return null;
  const user = USERS.find((u) => hash(u.id) === hashId);
  return user ? user.id : null;
}

// Per-user data storage
export function getUserData(userId) {
  const data = localStorage.getItem(`snackora_userdata_${userId}`);
  return data ? JSON.parse(data) : { addresses: [], cart: [], wishlist: [] };
}

export function setUserData(userId, data) {
  localStorage.setItem(`snackora_userdata_${userId}`, JSON.stringify(data));
}