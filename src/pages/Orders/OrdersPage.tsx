import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Package, Calendar, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

interface Order {
  id: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
}

const user = {
  name: "John Doe",
  email: "tHt9t@example.com",
  avatar: "https://example.com/avatar.jpg",
};

const mockOrders: Order[] = [
  {
    id: "1001",
    date: "2024-01-15",
    status: "delivered",
    total: 1599.98,
    items: [
      {
        id: "1",
        name: "Smartphone Galaxy Pro",
        quantity: 1,
        price: 1299.99,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "4",
        name: "Fone Bluetooth",
        quantity: 1,
        price: 199.99,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  },
  {
    id: "1002",
    date: "2024-01-10",
    status: "shipped",
    total: 2499.99,
    items: [
      {
        id: "2",
        name: "Notebook Gamer",
        quantity: 1,
        price: 2499.99,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  },
  {
    id: "1003",
    date: "2024-01-05",
    status: "processing",
    total: 389.98,
    items: [
      {
        id: "3",
        name: "Tênis Esportivo",
        quantity: 1,
        price: 299.99,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "5",
        name: "Camiseta Premium",
        quantity: 1,
        price: 89.99,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  },
];

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusLabels = {
  pending: "Pendente",
  processing: "Processando",
  shipped: "Enviado",
  delivered: "Entregue",
  cancelled: "Cancelado",
};

export default function OrdersPage() {
  const [orders] = useState<Order[]>(mockOrders);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Acesso Negado</h1>
        <p className="text-muted-foreground mb-4">
          Você precisa estar logado para ver seus pedidos.
        </p>
        <Button asChild>
          <Link to="/login">Fazer Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-8">
        <Package className="h-6 w-6" />
        <h1 className="text-3xl font-bold">Meus Pedidos</h1>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              Nenhum pedido encontrado
            </h2>
            <p className="text-muted-foreground mb-4">
              Você ainda não fez nenhum pedido.
            </p>
            <Button asChild>
              <Link to="/">Começar a Comprar</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Pedido #{order.id}
                      <Badge className={statusColors[order.status]}>
                        {statusLabels[order.status]}
                      </Badge>
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(order.date).toLocaleDateString("pt-BR")}
                      </div>
                      <div className="flex items-center gap-1">
                        <CreditCard className="h-4 w-4" />
                        R$ {order.total.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={item.id}>
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Quantidade: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            R$ {(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            R$ {item.price.toFixed(2)} cada
                          </p>
                        </div>
                      </div>
                      {index < order.items.length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
