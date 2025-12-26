"use client";
import { useFormik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import Button from "@/components/atoms/Button";
import ErrorLabel from "@/components/atoms/ErrorLabel";
import Fieldset from "@/components/atoms/Fieldset";
import IconButton from "@/components/atoms/IconButton";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import { TLogin } from "@/types/auth";
import { loginValidation } from "@/yupSchemas/user";
import { useToast } from "@/providers/toastProvider";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const submitMethod = async (data: TLogin) => {
    try {
      setLoading(true);
      await signIn("credentials", data);
    } catch (error) {
      let errorMessage = "Erro desconhecido. Favor tentar mais tarde.";
      if (error instanceof AuthError) {
        if (error.type === "CredentialsSignin")
          errorMessage = "Credenciais inválidas.";
      }
      showToast(errorMessage, "error");
      setLoading(false);
    }
  };
  const formik = useFormik<TLogin>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: submitMethod,
    validationSchema: loginValidation,
  });
  const [seePassword, setSeePassword] = useState<boolean>(false);
  return (
    <form className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
      <Fieldset>
        <Label>E-mail</Label>
        <Input
          id="email"
          placeholder="Digite seu email..."
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
          <ErrorLabel>{formik.errors.email}</ErrorLabel>
        )}
      </Fieldset>
      <Fieldset>
        <Label>Senha</Label>
        <Input
          id="password"
          type={seePassword ? "text" : "password"}
          placeholder="Digite sua senha..."
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          sufix={
            <IconButton
              title="Ver senha"
              aria-label="Ver senha"
              type="button"
              onClick={() => setSeePassword(!seePassword)}
              icon={seePassword ? <EyeOff size={16} /> : <Eye size={16} />}
            />
          }
        />
        {formik.touched.password && formik.errors.password && (
          <ErrorLabel>{formik.errors.password}</ErrorLabel>
        )}
      </Fieldset>
      <div className="text-end">
        <p>
          <Link href="/cadastrar">Clique aqui para se cadastrar</Link>
        </p>
      </div>
      <div className="text-end">
        <Button disabled={loading} type="submit">
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </div>
    </form>
  );
}
