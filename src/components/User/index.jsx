import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext";
import { FaRegUserCircle } from "react-icons/fa";
import "./user.css";

const User = (props) => {
  const { signed, user } = useContext(AuthContext);

  if (signed) {
    return (
      <div className="user">
        {user.avatarUrl === null ? (
          <FaRegUserCircle size={32} color="#fff" />
        ) : (
          <img src={user.avatarUrl} alt="Avatar" className="user-img" />
        )}

        <div>
          <span>Olá, {user.firstName}</span>
          <span className="acount-actions">
            <Link to="/userdetails">Minha conta</Link> |{" "}
            <button onClick={props.logout}>Sair</button>
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
