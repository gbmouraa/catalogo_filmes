import { useEffect, useState } from "react";
import Header from "../../components/Header";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./home.scss";
import Loader from "../../components/Loader";
import { IoLogOutOutline } from "react-icons/io5";

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "cf0ac2dec34f1b7ed67c633f20a75d67",
          language: "pt-br",
          page: 1,
        },
      });
      setFilmes(response.data.results);
      setLoading(false);
    }

    loadFilmes();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <section className="container-filmes">
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

export default Home;
