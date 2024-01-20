import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import "./favoritos.css";
import { toast } from "react-toastify";

function Favoritos() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const minhaLista = localStorage.getItem("@yourmovie");
    setFilmes(JSON.parse(minhaLista) || []);
  }, []);

  const excluirFilme = (id) => {
    const filtroFilmes = filmes.filter((item) => item.id !== id);
    setFilmes(filtroFilmes);
    localStorage.setItem("@yourmovie", JSON.stringify(filtroFilmes));
    toast.success("Filme excluido com sucesso!");
  };

  return (
    <>
      <Header />
      <section className="container-favoritos">
        <h1>Meus Filmes</h1>
        {filmes.length === 0 && <span>Você não possui filmes salvos :(</span>}
        <ul>
          {filmes.map((filme) => {
            return (
              <li key={filme.id}>
                <span className="titulo">{filme.title}</span>
                <div>
                  <Link to={`/filme/${filme.id}`}>Detalhes</Link>
                  <button
                    className="btn-excluir"
                    onClick={() => excluirFilme(filme.id)}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

export default Favoritos;
