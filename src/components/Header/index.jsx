import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../authContext";
import { Link } from "react-router-dom";
import User from "../User";
import "./header.css";
import ModalLogout from "../ModalLogout";

function Header() {
  const { logOut } = useContext(AuthContext);

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

  return (
    <>
      <header>
        <div className="container">
          <Link className="logo" to="/">
            YourMovie<span>.com</span>
          </Link>
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
