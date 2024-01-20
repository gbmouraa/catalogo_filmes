import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "./services/firebaseConection";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);

  const navigate = useNavigate();

  async function signUp(name, email, password) {
    setLoadingAuth(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        await setDoc(doc(db, "users", uid), {
          nome: name,
          avatarUrl: null,
        }).then(() => {
          let data = {
            userID: uid,
            name: name,
            email: value.user.email,
            avatarUrl: null,
          };

          setUser(data);
          setUserStorage(data);
          navigate("/");
          toast.success(`Bem vindo(a) ${name}`);
          setLoadingAuth(false);
        });
      })
      .catch((error) => {
        toast.error("Desculpe, ocorreu um erro, tente novamente");
        console.log(error);
        setLoadingAuth(false);
      });
  }

  function setUserStorage(user) {
    localStorage.setItem("@your-movie", JSON.stringify(user));
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signUp,
        loadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
