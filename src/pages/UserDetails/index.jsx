import { useState, useContext, useRef, useEffect } from "react";
import { AuthContext } from "../../authContext";
import { updateDoc, doc } from "firebase/firestore";
import { db, storage } from "../../services/firebaseConection";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Header from "../../components/Header";
import { FaHeart, FaRegUserCircle } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import "./userDetails.scss";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

function UserDetails() {
  const { user, setUser, setUserStorage } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [profileImg, setProfileImg] = useState(null);
  const [qtdFilmesSalvos, setQtdFilmesSalvos] = useState(null);

  const [loadingChanges, setloadingChanges] = useState(false);

  const nameRef = useRef(null);

  useEffect(() => {
    function loadFilmes() {
      const storageData = JSON.parse(localStorage.getItem("@your-movie"));
      const hasFilmes = storageData?.filmes;
      if (hasFilmes && hasFilmes.length > 0) {
        setQtdFilmesSalvos(hasFilmes.length);
      }
    }

    loadFilmes();
  }, []);

  function handleFile(e) {
    const img = e.target.files[0];

    if (img.type === "image/png" || img.type === "image/jpeg") {
      setProfileImg(img);
      setAvatarUrl(URL.createObjectURL(img));
    } else {
      alert("Insira uma imagem do tipo jpeg ou png.");
    }
  }

  async function handleSubmit() {
    const name = nameRef.current.value;

    if (name === "" && profileImg === null) return;

    if (name !== "" && profileImg === null) {
      setloadingChanges(true);
      const uid = user.userID;

      const docRef = doc(db, "users", uid);

      await updateDoc(docRef, {
        ...user,
        name: name,
      })
        .then(() => {
          let data = {
            ...user,
            name: name,
          };
          setUserStorage(data);
          setUser(data);
          setIsEditing(false);
          toast.success("Perfil atualizado com sucesso.");
          setloadingChanges(false);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Ocorreu um erro tente novamente");
          setloadingChanges(false);
        });

      return;
    }
    handleUpload();
  }

  async function handleUpload() {
    if (profileImg === "") return;

    setloadingChanges(true);
    const uid = user.userID;

    const uploadRef = ref(storage, `images/${uid}/${profileImg.name}`);

    await uploadBytes(uploadRef, profileImg).then((snapShot) => {
      getDownloadURL(snapShot.ref).then(async (downloadUrl) => {
        let profileImgUrl = downloadUrl;

        const docRef = doc(db, "users", uid);

        await updateDoc(docRef, {
          ...user,
          avatarUrl: profileImgUrl,
        })
          .then(() => {
            let data = {
              ...user,
              avatarUrl: profileImgUrl,
            };
            setUser(data);
            setUserStorage(data);
            toast.success("Perfil atualizado.");
            setIsEditing(false);
            setloadingChanges(false);
          })
          .catch((error) => {
            console.log(error);
            toast.error("Algo deu errado, tente novamente.");
            setloadingChanges(false);
          });
      });
    });
  }

  function handleBack() {
    const currentImg = user && user.avatarUrl;
    setIsEditing(false);
    setAvatarUrl(currentImg);
    setProfileImg("");
  }

  return (
    <>
      <Header />
      <div className="user-details">
        {isEditing ? (
          <>
            <div className="user-info">
              <div className="avatar">
                {avatarUrl !== null ? (
                  <div className="user-avatar">
                    <img src={avatarUrl} alt="Avatar" />
                  </div>
                ) : (
                  <FaRegUserCircle size={72} />
                )}
                <input
                  type="file"
                  id="file"
                  accept="img/*"
                  onChange={handleFile}
                />
                <label className="btn-edit-avatar" htmlFor="file">
                  <RiPencilFill size={14} color="#fff" />
                </label>
              </div>
              <div>
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  id="nome"
                  placeholder={user.name}
                  ref={nameRef}
                />
              </div>
            </div>

            <div className="user-actions">
              <button className="btn-save" onClick={() => handleSubmit()}>
                Salvar
              </button>
              <button className="btn-back" onClick={handleBack}>
                Voltar
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="user-info">
              <div className="avatar">
                {avatarUrl !== null ? (
                  <div className="user-avatar">
                    <img src={avatarUrl} alt="Avatar" />
                  </div>
                ) : (
                  <FaRegUserCircle size={72} />
                )}
              </div>
              <div>
                <span>{user.name}</span>
                <span className="email">{user.email}</span>
              </div>
            </div>

            <span>
              <FaHeart size={14} color="#fff" style={{ marginRight: "8px" }} />
              {qtdFilmesSalvos
                ? `Você possui ${qtdFilmesSalvos} filme(s) favoritados`
                : "Você não possui nenhum filme favoritado"}
            </span>

            <div className="user-actions">
              <button className="btn-edit" onClick={() => setIsEditing(true)}>
                Editar perfil
              </button>
            </div>
          </>
        )}
      </div>
      {loadingChanges && <Loader />}
    </>
  );
}

export default UserDetails;
