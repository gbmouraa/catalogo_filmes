import { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "../../authContext";
import { Link, useNavigate } from "react-router-dom";
import User from "../User";
import "./header.scss";
import ModalLogout from "../ModalLogout";
import { IoSearch } from "react-icons/io5";

function Header() {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const searchRef = useRef(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [modalIsOpen]);

  async function handleLogout() {
    await logOut();
    setModalIsOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const movieToSearch = searchRef.current.value;

    if (movieToSearch === "" || movieToSearch === null) return;

    // parametro passado por url para pagina search
    const movie = encodeURIComponent(movieToSearch);
    navigate(`/search/${movie}`);
  }

  return (
    <>
      <header>
        <div className="container">
          <Link className="logo" to="/">
            YourMovie<span>.com</span>
          </Link>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              placeholder="Busque por algum filme"
              ref={searchRef}
            />
            <button type="submit">
              <IoSearch size={20} color="#919191" />
            </button>
          </form>
          <div className="actions">
            <Link className="meus-filmes" to="/favoritos">
              Meus Filmes
            </Link>
            <User logout={() => setModalIsOpen(true)} />
          </div>
        </div>
      </header>

      {modalIsOpen && (
        <ModalLogout
          voltar={() => setModalIsOpen(false)}
          sair={() => handleLogout()}
        />
      )}
    </>
  );
}

export default Header;
