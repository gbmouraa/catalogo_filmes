import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../authContext";
import { db } from "../../services/firebaseConection";
import { updateDoc, doc } from "firebase/firestore";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import "./favoritos.css";
import { toast } from "react-toastify";
import { IoLogOutOutline } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";

function Favoritos() {
  const { user, setUser, setUserStorage } = useContext(AuthContext);
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    function loadFilmes() {
      let storageData = JSON.parse(localStorage.getItem("@your-movie"));
      const hasFilmesSalvos = storageData?.filmes;
      if (hasFilmesSalvos && hasFilmesSalvos.length > 0)
        setFilmes(hasFilmesSalvos);
    }

    loadFilmes();
  }, []);

  const excluirFilme = async (id) => {
    const filtroFilmes = filmes.filter((item) => item.id !== id);
    setFilmes(filtroFilmes);

    const uid = user.userID;
    const docRef = doc(db, "users", uid);

    await updateDoc(docRef, {
      ...user,
      filmes: filtroFilmes,
    })
      .then(() => {
        let data = {
          ...user,
          filmes: filtroFilmes,
        };
        setUserStorage(data);
        setUser(data);
        toast.success("Filme excluido com sucesso!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocorreu um erro tente novamente.");
      });
  };

  return (
    <>
      <Header />
      <section className="container-favoritos">
        <h1>Meus Filmes</h1>
        {filmes.length === 0 && <span>Você não possui filmes salvos :(</span>}
        <section className="container-filmes favoritos">
          {filmes.map((filme) => {
            return (
              <div key={filme.id} className="card-favorito">
                <button
                  className="btn-excluir"
                  onClick={() => excluirFilme(filme.id)}
                >
                  <FaTrashCan />
                </button>
                <article className="filme favorito">
                  <img
                    src={`https://image.tmdb.org/t/p/original${filme.poster_path}`}
                    alt={filme.title}
                  />
                  <Link to={`/filme/${filme.id}`} className="filme-focus">
                    <span>{filme.title}</span>
                    <div>
                      Acessar{" "}
                      <IoLogOutOutline
                        size={36}
                        style={{ marginLeft: "4px" }}
                      />
                    </div>
                  </Link>
                </article>
              </div>
            );
          })}
        </section>
      </section>
    </>
  );
}

export default Favoritos;
