import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext";
import { FaRegUserCircle } from "react-icons/fa";
import "./user.css";

const User = () => {
  const { signed, user, logOut } = useContext(AuthContext);

  if (signed) {
    return (
      <div className="user">
        {user.avatarUrl === null ? (
          <FaRegUserCircle size={32} color="#fff" />
        ) : (
          <img src={user.avatarUrl} alt="Avatar" />
        )}

        <div>
          <span>Olá, {user.name}</span>
          <span className="acount-actions">
            <Link to="/userdetails">Minha conta</Link> |{" "}
            <button onClick={() => logOut()}>Sair</button>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="user">
      <FaRegUserCircle size={32} color="#fff" />
      <div className="login-actions">
        <span>
          <Link to="/login">Faça login</Link>, ou
        </span>
        <Link to="/register">Cadastre-se</Link>
      </div>
    </div>
  );
};

export default User;
