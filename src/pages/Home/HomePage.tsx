import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Star } from "lucide-react";
import { getProducts } from "@/services/Products";
import { useAuth } from "@/utils/useAuth";
import type { ProductProps } from "@/interfaces/Products";
import { getCategories } from "@/services/Category";
import type { CategoryProps } from "@/interfaces/Category";
import { Pagination } from "@/components/Pagination/Pagination";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { token } = useAuth();

  const fetchProducts = async (page: number) => {
    if (!token) return;
    setLoadingProducts(true);
    setError(null);
    try {
      const { data, currentPage, totalPages } = await getProducts(token, page);

      setProducts(data);
      setPagination({ currentPage, totalPages });
      console.log("Produtos carregados:", data);
      console.log("Paginação:", { currentPage, totalPages });
    } catch (error: any) {
      console.error("Erro ao buscar produtos:", error);
      setError("Falha ao carregar produtos. Tente novamente.");
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      if (!token) return;
      try {
        const response = await getCategories(token);
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    if (token) {
      fetchProducts(1);
      fetchCategories();
    }
  }, [token]);

  const filteredProducts = Array.isArray(products)
    ? products.filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const categoryIdToMatch =
          selectedCategory === "all" ? "all" : parseInt(selectedCategory);
        const matchesCategory =
          categoryIdToMatch === "all" ||
          product.category_id === categoryIdToMatch;
        return matchesSearch && matchesCategory;
      })
    : [];

  const handlePageChange = (page: number) => {
    fetchProducts(page);
  };

  const handleAddToCart = (product: (typeof products)[0]) => {
    console.log("Adicionar ao carrinho:", product.name);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center py-12 mb-12">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo à nossa loja!</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Encontre os melhores produtos com os melhores preços
        </p>
        <div className="max-w-md mx-auto flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={String(category.id)}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Produtos em Destaque</h2>
        {error && (
          <div className="text-center text-red-500 mb-4">{error}</div>
        )}{" "}
        {loadingProducts ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 15 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="p-0">
                  <Skeleton className="w-full h-48 rounded-t-lg" />
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-6 w-1/4" />
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-3" />
                  <Skeleton className="h-4 w-1/3 mb-3" />
                  <Skeleton className="h-8 w-1/2" />
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <CardHeader className="p-0">
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-500 text-xs">
                    Sem Imagem
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <Badge variant="secondary">
                      {categories.find((cat) => cat.id === product.category_id)
                        ?.name || `ID: ${product.category_id}`}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">
                      Avaliação (Exemplo)
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    R$ {Number(product.price).toFixed(2)}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    className="w-full"
                    onClick={() => handleAddToCart(product)}
                  >
                    Adicionar ao Carrinho
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center text-lg">Nenhum produto encontrado.</div>
        )}
        {pagination.totalPages > 1 && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </section>
    </div>
  );
}
