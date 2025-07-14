import { CATEGORIES_ENDPOINT } from "@/constants/endpoints";
import { api } from "./api";

export async function getCategories(token: string | null) {
  try {
    const response = await api.get(CATEGORIES_ENDPOINT.getCategories, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    throw error;
  }
}
