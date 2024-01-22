import { useState, useContext } from "react";
import { AuthContext } from "../../authContext";
import Header from "../../components/Header";
import { FaHeart, FaRegUserCircle } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import "./userDetails.scss";

function UserDetails() {
  const { user } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <Header />
      <div className="user-details">
        {isEditing ? (
          <>
            <div className="user-info">
              <div className="avatar">
                <FaRegUserCircle size={52} />
                <input type="file" id="file" />
                <label className="btn-edit-avatar" htmlFor="file">
                  <RiPencilFill size={14} color="#fff" />
                </label>
              </div>
              <div>
                <label htmlFor="nome">Nome</label>
                <input type="text" id="nome" />
              </div>
            </div>

            <div className="user-actions">
              <button className="btn-save">Salvar</button>
              <button className="btn-back" onClick={() => setIsEditing(false)}>
                Voltar
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="user-info">
              <div className="avatar">
                <FaRegUserCircle size={52} />
              </div>
              <div>
                <span>{user.name}</span>
                <span className="email">{user.email}</span>
              </div>
            </div>

            <span>
              <FaHeart size={14} color="#fff" style={{ marginRight: "8px" }} />2
              filmes favoritados
            </span>

            <div className="user-actions">
              <button className="btn-edit" onClick={() => setIsEditing(true)}>
                Editar perfil
              </button>
              <button className="btn-logout">Sair</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default UserDetails;
