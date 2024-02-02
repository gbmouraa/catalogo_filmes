import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../authContext";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Footer from "../../components/Footer";

import "./signIn.scss";

const schema = z.object({
  email: z
    .string()
    .min(1, "Campo email não pode estar vazio")
    .email("Insira um email válido"),
  password: z.string().min(1, "Campo senha não pode estar vazio."),
});

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const { loadingAuth, signIn } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(data) {
    const { email, password } = data;
    await signIn(email, password);
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

          <span>Login</span>
          <p>Use a conta cadastrada para fazer login.</p>

          <div className="form">
            <div className="input-container">
              <input
                className={errors?.email && "input-error"}
                type="text"
                id="email"
                autoComplete="off"
                {...register("email")}
                placeholder="email"
              />
              <label htmlFor="email">Email</label>

              {errors?.email && (
                <p className="error-message">{errors.email.message}</p>
              )}
            </div>

            <div className="input-container">
              <input
                className={`default-input ${errors?.password && "input-error"}`}
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="off"
                {...register("password")}
                placeholder="Senha"
              />
              <label htmlFor="password">Senha</label>

              {errors?.password && (
                <p className="error-message">{errors.password.message}</p>
              )}

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
            </div>

            <div className="actions-area">
              <Link to="/register">Criar uma conta</Link>
              <button
                onClick={() => handleSubmit(onSubmit)()}
                className="default-btn"
              >
                Entrar
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default SignIn;
