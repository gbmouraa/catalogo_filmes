import { Link } from "react-router-dom";
import Header from "../../components/Header";
import "./erro.css";

function Erro() {
  return (
    <>
      <Header />

      <section className="container-erro">
        <h1>
          Página não encontrada, ir para <Link to="/">Home</Link>
        </h1>
      </section>
    </>
  );
}

export default Erro;
