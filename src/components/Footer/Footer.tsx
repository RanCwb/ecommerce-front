"use client";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Shield,
  Truck,
  RotateCcw,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t">
      {/* Newsletter Section */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">
                Fique por dentro das novidades!
              </h3>
              <p className="text-primary-foreground/80">
                Receba ofertas exclusivas e lançamentos em primeira mão
              </p>
            </div>
            <div className="flex w-full md:w-auto max-w-sm gap-2">
              <Input
                placeholder="Seu e-mail"
                className="bg-white text-black"
                type="email"
              />
              <Button variant="secondary">
                <Mail className="h-4 w-4 mr-2" />
                Inscrever
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">EcommerceApp</h3>
            <p className="text-muted-foreground">
              Sua loja online de confiança com os melhores produtos e preços do
              mercado.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>Rua das Flores, 123 - São Paulo, SP</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>(11) 9999-9999</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>contato@ecommerceapp.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Produtos
                </Link>
              </li>
              <li>
                <Link
                  to="/orders"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Meus Pedidos
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Meu Perfil
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Atendimento</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Central de Ajuda
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Como Comprar
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Política de Troca
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Termos de Uso
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media & Features */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Redes Sociais</h4>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3 mt-6">
              <h5 className="font-medium">Nossos Diferenciais</h5>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-4 w-4 text-green-600" />
                  <span>Frete Grátis acima de R$ 99</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span>Compra 100% Segura</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <RotateCcw className="h-4 w-4 text-orange-600" />
                  <span>7 dias para trocar</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Payment Methods */}
        <div className="space-y-4">
          <h4 className="font-semibold text-center">Formas de Pagamento</h4>
          <div className="flex justify-center items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1 px-3 py-2 bg-white rounded border">
              <CreditCard className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">Visa</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-2 bg-white rounded border">
              <CreditCard className="h-5 w-5 text-red-600" />
              <span className="text-sm font-medium">Mastercard</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-2 bg-white rounded border">
              <CreditCard className="h-5 w-5 text-yellow-600" />
              <span className="text-sm font-medium">Elo</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-2 bg-white rounded border">
              <CreditCard className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">PIX</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-2 bg-white rounded border">
              <CreditCard className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium">Boleto</span>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="text-center md:text-left">
            <p>
              &copy; {currentYear} EcommerceApp. Todos os direitos reservados.
            </p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Termos de Serviço
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
