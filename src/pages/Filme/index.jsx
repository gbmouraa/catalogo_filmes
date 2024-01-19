import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../services/api";
import "./filme.css";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

function Filme() {
  const { id } = useParams();
  const [filme, setFilme] = useState({});
  const [loading, setloading] = useState(true);
  const navigation = useNavigate();

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "cf0ac2dec34f1b7ed67c633f20a75d67",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setFilme(response.data);
          setloading(false);
        })
        .catch(() => {
          navigation("/", { replace: true });
          return;
        });
    }
    loadFilme();
  }, [id, navigation]);

  if (loading) {
    return <Loader />;
  }

  const salvarFilme = () => {
    const minhaLista = localStorage.getItem("@yourmovie");

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some(
      (filmeSalvo) => filmeSalvo.id === filme.id
    );

    if (hasFilme) {
      toast.warn("Este filme ja esta na sua lista!");
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@yourmovie", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso!");
  };

  return (
    <section className="container-filme">
      <h1>{filme.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original${filme.backdrop_path}`}
        alt={filme.title}
      />
      <strong>Sinopse</strong>
      <p>{filme.overview}</p>
      <p className="avaliacao">Avaliação: {filme.vote_average}/10</p>
      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a
            target="blank"
            rel="external"
            href={`https://youtube.com/results?search_query=${filme.title} Trailer`}
          >
            Trailer
          </a>
        </button>
      </div>
    </section>
  );
}

export default Filme;
