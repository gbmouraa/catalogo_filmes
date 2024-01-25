import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../services/firebaseConection";
import { doc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../../authContext";
import api from "../../services/api";
import "./filme.css";
import Loader from "../../components/Loader";
import Header from "../../components/Header";
import { toast } from "react-toastify";

function Filme() {
  const { id } = useParams();
  const [filme, setFilme] = useState({});
  const [filmesSalvos, setFilmesSalvos] = useState(null);
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();

  const { user, setUser, setUserStorage, signed } = useContext(AuthContext);

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
          navigate("/", { replace: true });
          return;
        });
    }
    loadFilme();
  }, [id, navigate]);

  useEffect(() => {
    function loadFilmesSalvos() {
      const storageData = JSON.parse(localStorage.getItem("@your-movie"));
      const hasFilmesSalvos = storageData?.filmes;
      if (hasFilmesSalvos && hasFilmesSalvos.length > 0)
        setFilmesSalvos(hasFilmesSalvos);
    }

    loadFilmesSalvos();
  }, []);

  const salvarFilme = async () => {
    if (!signed) {
      toast.warn("Faça login para salvar um filme.");
      navigate("/login");
      return;
    }

    if (filmesSalvos !== null && filmesSalvos.length > 0) {
      const hasFilme = filmesSalvos.some(
        (filmeSalvo) => filmeSalvo.id === filme.id
      );

      if (hasFilme) {
        toast.warn("Este filme ja esta na sua lista!");
        return;
      }
    }

    let arrFilme = [];

    if (filmesSalvos === null || filmesSalvos.length === 0) {
      arrFilme.push(filme);
    } else {
      arrFilme = [...filmesSalvos, filme];
    }

    setFilmesSalvos(arrFilme);

    const uid = user.userID;
    const docRef = doc(db, "users", uid);

    await updateDoc(docRef, {
      ...user,
      filmes: arrFilme,
    })
      .then(() => {
        let data = {
          ...user,
          filmes: arrFilme,
        };
        setUserStorage(data);
        setUser(data);
        toast.success("Filme salvo com sucesso!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocorreu um erro, tente novamente.");
      });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Header />

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
    </>
  );
}

export default Filme;
