import * as Yup from "yup";

export const registerSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, "O nome deve ter pelo menos 3 caracteres.")
    .max(50, "O nome não pode exceder 50 caracteres.")
    .required("Nome completo é obrigatório."),
  email: Yup.string().email("Email inválido.").required("Email é obrigatório."),
  password: Yup.string()
    .min(8, "A senha deve ter pelo menos 8 caracteres.")
    .matches(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula.")
    .matches(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
    .matches(/[0-9]/, "A senha deve conter pelo menos um número.")
    .matches(
      /[^a-zA-Z0-9]/,
      "A senha deve conter pelo menos um caractere especial."
    )
    .required("Senha é obrigatória."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "As senhas não coincidem.")
    .required("Confirmação de senha é obrigatória."),
});
