import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Pagination } from "@mui/material";
import Footer from "../../components/Footer";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./home.scss";
import Loader from "../../components/Loader";
import { IoLogOutOutline } from "react-icons/io5";

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "cf0ac2dec34f1b7ed67c633f20a75d67",
          language: "pt-br",
          page: page,
        },
      });
      setFilmes(response.data.results);
      setLoading(false);
    }

    loadFilmes();
  }, [page]);

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
                <span className="filme-title">{filme.title}</span>
                <div>
                  Acessar{" "}
                  <IoLogOutOutline size={30} style={{ marginLeft: "4px" }} />
                </div>
              </Link>
            </article>
          );
        })}
      </section>

      <Pagination
        count={15}
        shape="rounded"
        variant="outlined"
        onChange={(event, value) => setPage(value)}
      />

      <Footer />
    </>
  );
}

export default Home;
