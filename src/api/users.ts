import { api } from "./client.js";

export type Position = { id: number; name: string };
export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  position_id: number;
  registration_timestamp: number;
  photo: string;
};

export async function getPositions(): Promise<Position[]> {
  const { data } = await api.get("/positions");
  return data.positions;
}

export async function getUsers(page = 1, count = 6) {
  const { data } = await api.get("/users", { params: { page, count } });
  // API вже newest-first; сортування дублюємо для надійності:
  data.users.sort(
    (a: User, b: User) => b.registration_timestamp - a.registration_timestamp
  );
  return data as {
    success: boolean;
    page: number;
    total_pages: number;
    total_users: number;
    count: number;
    users: User[];
  };
}

export type CreateUserPayload = {
  name: string; email: string; phone: string; position_id: number; photo: File;
};

export async function getToken(): Promise<string> {
  const { data } = await api.get("/token");
  return data.token;
}

export async function createUser(payload: CreateUserPayload) {
  const token = await getToken();
  const form = new FormData();
  form.append("name", payload.name);
  form.append("email", payload.email);
  form.append("phone", payload.phone);
  form.append("position_id", String(payload.position_id));
  form.append("photo", payload.photo);
  await api.post("/users", form, { headers: { Token: token } });
}
