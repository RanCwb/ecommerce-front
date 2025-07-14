import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { useFormik } from "formik";
import { loginSchema } from "@/schemas/LoginSchema";
import { toast } from "sonner";
import { useAuth } from "@/utils/useAuth";

export default function LoginPage() {
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLoginApiCall = async (values: typeof formik.initialValues) => {
    try {
      await login(values.email, values.password);
      toast.success("Login bem-sucedido!", {
        description: "Redirecionando para perfil...",
      });
      navigate("/");
    } catch (error) {
      toast.error("Erro ao fazer login!");
      console.log("Erro ao fazer login:", error);
      if (error instanceof Error) {
        setApiError(error.message);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      await handleLoginApiCall(values);
      setSubmitting(false);
    },
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Entrar</CardTitle>
          <CardDescription className="text-center">
            Digite seu email e senha para acessar sua conta
          </CardDescription>
        </CardHeader>
        <form onSubmit={formik.handleSubmit}>
          <CardContent className="space-y-4">
            {apiError && (
              <Alert variant="destructive">
                <AlertDescription>{apiError}</AlertDescription>
              </Alert>
            )}

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
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full mb-2 mt-4"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Entrar
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Não tem uma conta?{" "}
              <Link to="/register" className="text-primary hover:underline">
                Cadastre-se
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
