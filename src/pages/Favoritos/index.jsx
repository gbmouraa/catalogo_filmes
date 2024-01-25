import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../authContext";
import { db } from "../../services/firebaseConection";
import { updateDoc, doc } from "firebase/firestore";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import "./favoritos.css";
import { toast } from "react-toastify";

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
