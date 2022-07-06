import axios from "axios";

const inst = axios.create({
  baseURL: "localhost:8000",
});

export async function getJwt({ id }: { id: string }) {
  try {
    return (await inst.get(`/token/${id}`)).data as { token: string };
  } catch (error) {
    throw error;
  }
}
