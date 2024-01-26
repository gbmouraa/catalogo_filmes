import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import { IoLogOutOutline } from "react-icons/io5";

function Search() {
  const { movie } = useParams();
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadQuery() {
      const reponse = await api.get("search/movie", {
        params: {
          api_key: "cf0ac2dec34f1b7ed67c633f20a75d67",
          language: "pt-BR",
          query: movie,
        },
      });
      setFilmes(reponse.data.results);
      setLoading(false);
    }

    loadQuery();
  }, [movie]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Header />

      <section className="container-filmes">
        {filmes.length === 0 && <h1>Nenhum filme encontrado :(</h1>}
        {filmes.map((filme) => {
          return (
            <article key={filme.id} className="filme">
              <img
                src={`https://image.tmdb.org/t/p/original${filme.poster_path}`}
                alt={filme.title}
              />
              <Link to={`/filme/${filme.id}`} className="filme-focus">
                <span>{filme.title}</span>
                <div>
                  Acessar{" "}
                  <IoLogOutOutline size={36} style={{ marginLeft: "4px" }} />
                </div>
              </Link>
            </article>
          );
        })}
      </section>
    </>
  );
}

export default Search;
