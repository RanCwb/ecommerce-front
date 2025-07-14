export interface ProductProps {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  stock_quantity: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
