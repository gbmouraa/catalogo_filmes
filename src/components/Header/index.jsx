import { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "../../authContext";
import { Link, useNavigate } from "react-router-dom";
import User from "../User";
import "./header.scss";
import ModalLogout from "../ModalLogout";
import { IoSearch } from "react-icons/io5";
import { LuHandMetal, LuMenu } from "react-icons/lu";
import { CgClose } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";

function Header() {
  const { logOut, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const searchRef = useRef(null);
  const searchRefNav = useRef(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [navIsActive, setNavIsActive] = useState(false);

  const profilePic = user && user.avatarUrl;

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
    setNavIsActive(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let movieToSearch;

    if (e.target.id === "form-nav") {
      movieToSearch = searchRefNav.current.value;
      searchRefNav.current.value = "";
      setNavIsActive(false);
    } else {
      movieToSearch = searchRef.current.value;
      searchRef.current.value = "";
    }

    if (movieToSearch === "" || movieToSearch === null) return;

    // parametro passado por url para pagina search
    const movie = encodeURIComponent(movieToSearch);
    navigate(`/search/${movie}`);
  }

  return (
    <>
      <header>
        {/* mobile */}
        <button className="navTrigger" onClick={() => setNavIsActive(true)}>
          <LuMenu color="#fff" size={30} />
        </button>

        <Link className="logo-mobile" to="/">
          YourMovie
        </Link>

        <div className={`header-mobile ${navIsActive ? "active" : ""}`}>
          <nav className={`nav-mobile ${navIsActive ? "active" : ""}`}>
            <div className="nav-trigger-active">
              <span className="logo-nav">YourMovie</span>
              <button onClick={() => setNavIsActive(false)}>
                <CgClose size={30} color="#fff" />
              </button>
            </div>

            <form
              className="form-nav"
              id="form-nav"
              onSubmit={(e) => handleSubmit(e)}
            >
              <input
                type="text"
                placeholder="Busque por algum filme"
                ref={searchRefNav}
              />
              <button type="submit">
                <IoSearch size={20} color="#919191" />
              </button>
            </form>

            <div className="user-nav">
              {profilePic !== null ? (
                <img src={user.avatarUrl} alt="Avatar" />
              ) : (
                <FaRegUser style={{ marginRight: "14px" }} />
              )}
              Olá {user.firstName ? user.firstName : "Convidado"}
            </div>

            {user ? (
              <ul>
                <li>
                  <Link to="/userdetails">Minha conta</Link>
                </li>
                <li>
                  <Link to="/favoritos">Meus filmes</Link>
                </li>
                <li onClick={() => setModalIsOpen(true)}>Sair</li>
              </ul>
            ) : (
              <ul>
                <li>
                  <Link to="/login">Fazer login</Link>
                </li>
              </ul>
            )}
          </nav>
        </div>

        {/* desktop */}
        <div className="container">
          <Link className="logo" to="/">
            YourMovie
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
