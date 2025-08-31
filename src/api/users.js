import { api } from "./client.js";
export async function getPositions() {
    const { data } = await api.get("/positions");
    return data.positions;
}
export async function getUsers(page = 1, count = 6) {
    const { data } = await api.get("/users", { params: { page, count } });
    // API вже newest-first; сортування дублюємо для надійності:
    data.users.sort((a, b) => b.registration_timestamp - a.registration_timestamp);
    return data;
}
export async function getToken() {
    const { data } = await api.get("/token");
    return data.token;
}
export async function createUser(payload) {
    const token = await getToken();
    const form = new FormData();
    form.append("name", payload.name);
    form.append("email", payload.email);
    form.append("phone", payload.phone);
    form.append("position_id", String(payload.position_id));
    form.append("photo", payload.photo);
    await api.post("/users", form, { headers: { Token: token } });
}
