import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Footer from "../../components/Footer";

const schema = z.object({
  nome: z.string().min(1, "Campo nome não pode estar vazio."),
  email: z
    .string()
    .min(1, "Campo email não pode estar vazio")
    .email("Digite um email válido"),
  password: z
    .string()
    .min(1, "Campo senha não pode estar vazio.")
    .min(6, "Senha deve conter no minimo 6 caracteres"),
});

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const { signUp, loadingAuth } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(data) {
    const { nome, email, password } = data;
    await signUp(nome, email, password);
  }

  return (
    <>
      <div className="login-area">
        <div className="card">
          <div className="loading-area">
            <span className={loadingAuth ? "loading-animation" : ""}></span>
          </div>
          <Link to="/" className="your-movie">
            YourMovie.com
          </Link>

          <span style={{ marginBottom: "0" }}>Criar nova conta</span>

          <div className="form">
            <div className="input-container">
              <input
                className={errors?.nome && "input-error"}
                type="text"
                id="name"
                autoComplete="off"
                {...register("nome")}
                placeholder="Nome"
              />
              <label htmlFor="email">Nome</label>

              {errors?.nome && (
                <p className="error-message">{errors.nome.message}</p>
              )}
            </div>

            <div className="input-container">
              <input
                className={errors?.email && "input-error"}
                type="text"
                id="email"
                autoComplete="off"
                {...register("email")}
                placeholder="Email"
              />
              <label htmlFor="email">Email</label>

              {errors?.email && (
                <p className="error-message">{errors.email.message}</p>
              )}
            </div>

            <div className="input-container">
              <input
                className={errors?.password && "input-error"}
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="off"
                {...register("password")}
                placeholder="Senha"
              />
              <label htmlFor="password">Senha</label>

              <button
                className="btn-toggle-password"
                onClick={() => setShowPassword(() => !showPassword)}
              >
                {showPassword ? (
                  <FaRegEye size={24} color="#ccc" />
                ) : (
                  <FaRegEyeSlash size={24} color="#ccc" />
                )}
              </button>

              {errors?.password && (
                <p className="error-message">{errors.password.message}</p>
              )}
            </div>

            <div className="actions-area">
              <button
                onClick={() => handleSubmit(onSubmit)()}
                className="default-btn"
              >
                Cadastrar
              </button>
              <Link
                to="/login"
                style={{
                  width: "100%",
                  textAlign: "center",
                  marginTop: "3.6rem",
                }}
              >
                Já possui uma conta? Faça login
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignUp;
