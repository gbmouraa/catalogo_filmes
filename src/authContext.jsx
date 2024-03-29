import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "./services/firebaseConection";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loadingAuth, setLoadingAuth] = useState(false);
  // carregar usuario do localStorage, usada para definir oque será retornado na rota privada
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    function loadUserStorage() {
      const userStorage = localStorage.getItem("@your-movie");

      if (userStorage) {
        setUser(JSON.parse(userStorage));
      }
      setLoading(false);
    }

    loadUserStorage();
  }, []);

  async function signUp(name, email, password) {
    setLoadingAuth(true);

    const firstName = name.split(" ")[0];

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        await setDoc(doc(db, "users", uid), {
          userID: uid,
          name: name,
          firstName: firstName,
          avatarUrl: null,
        }).then(() => {
          let data = {
            userID: uid,
            name: name,
            firstName: firstName,
            email: value.user.email,
            avatarUrl: null,
          };

          setUser(data);
          setUserStorage(data);
          navigate("/");
          toast.success(`Bem vindo(a) ${firstName}`);
          setLoadingAuth(false);
        });
      })
      .catch((error) => {
        toast.error("Desculpe, ocorreu um erro, tente novamente");
        console.log(error);
        setLoadingAuth(false);
      });
  }

  async function signIn(email, password) {
    setLoadingAuth(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        let data = {
          userID: uid,
          name: docSnap.data().name,
          firstName: docSnap.data().firstName,
          email: value.user.email,
          avatarUrl: docSnap.data().avatarUrl,
          filmes: docSnap.data()?.filmes,
        };

        setUser(data);
        setUserStorage(data);
        setLoadingAuth(false);
        navigate("/");
        toast.success(`Bem vindo de volta ${data.firstName}`);
      })
      .catch((error) => {
        console.log(error);
        setLoadingAuth(false);
        toast.error("Ocorreu um erro, tente novamente mais tarde.");
      });
  }

  function setUserStorage(user) {
    localStorage.setItem("@your-movie", JSON.stringify(user));
  }

  async function logOut() {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem("@your-movie");
    navigate("/");
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        setUser,
        signUp,
        signIn,
        logOut,
        loadingAuth,
        loading,
        setUserStorage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
