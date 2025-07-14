import type React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useFormik } from "formik";
import { toast } from "sonner";
import { api } from "@/services/api";
import { API_ENDPOINTS } from "@/constants/endpoints";
import { registerSchema } from "@/schemas/RegisterSchame";

export default function RegisterPage() {
  const [apiError, setApiError] = useState("");

  const handleRegisterApiCall = async (values: typeof formik.initialValues) => {
    try {
      const response = api.post(API_ENDPOINTS.register, values);
      toast.success("Registro bem-sucedido!", {
        description:
          "Sua conta foi criada com sucesso. Redirecionando para login...",
      });
      return true;
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      setApiError(
        "Ocorreu um erro ao registrar o usuário. Por favor, tente novamente."
      );
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      const success = await handleRegisterApiCall(values);
      if (success) {
        resetForm();
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Criar Conta</CardTitle>
          <CardDescription className="text-center">
            Preencha os dados abaixo para criar sua conta
          </CardDescription>
        </CardHeader>
        <form onSubmit={formik.handleSubmit}>
          {" "}
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input
                id="name"
                type="text"
                placeholder="Seu nome"
                {...formik.getFieldProps("name")}
                className={
                  formik.touched.name && formik.errors.name
                    ? "border-destructive"
                    : ""
                }
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-sm text-destructive mt-1">
                  {formik.errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                {...formik.getFieldProps("email")}
                className={
                  formik.touched.email && formik.errors.email
                    ? "border-destructive"
                    : ""
                }
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-destructive mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...formik.getFieldProps("password")}
                className={
                  formik.touched.password && formik.errors.password
                    ? "border-destructive"
                    : ""
                }
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-destructive mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                {...formik.getFieldProps("confirmPassword")}
                className={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "border-destructive"
                    : ""
                }
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-sm text-destructive mt-1">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Criar Conta
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Já tem uma conta?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Faça login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
