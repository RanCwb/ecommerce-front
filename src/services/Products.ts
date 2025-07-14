// src/services/Products.ts
import { PRODUCTS_ENDPOINT } from "@/constants/endpoints";
import { api } from "./api"; // Verifique se o caminho para 'api' está correto

interface PaginatedProductsResponse {
  data: any[]; // Substitua 'any' pela sua interface ProductProps[]
  current_page: number;
  last_page: number;
  total: number;
  // Adicione outras propriedades da resposta de paginação do Laravel se precisar
}

export async function getProducts(token: string | null | undefined, page = 1) {
  try {
    const response = await api.get<any>( // Use <any> ou uma interface mais específica se tiver para a resposta completa
      `${PRODUCTS_ENDPOINT.getProducts}?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const paginatedProducts = response.data
      .products as PaginatedProductsResponse;

    if (!paginatedProducts) {
      throw new Error(
        "Dados de paginação de produtos não encontrados na resposta da API."
      );
    }

    return {
      data: paginatedProducts.data,
      currentPage: paginatedProducts.current_page,
      totalPages: paginatedProducts.last_page,
      totalItems: paginatedProducts.total,
    };
  } catch (error) {
    console.error("Erro ao buscar produtos no serviço Products.ts:", error);

    throw error;
  }
}
