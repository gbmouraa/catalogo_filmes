import { useState, useContext, useRef } from "react";
import { AuthContext } from "../../authContext";
import { updateDoc, doc } from "firebase/firestore";
import { db, storage } from "../../services/firebaseConection";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Header from "../../components/Header";
import { FaHeart, FaRegUserCircle } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import "./userDetails.scss";
import { toast } from "react-toastify";

function UserDetails() {
  const { user, setUser, setUserStorage } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [profileImg, setProfileImg] = useState(null);

  const nameRef = useRef(null);

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
        })
        .catch((error) => {
          console.log(error);
          toast.error("Ocorreu um erro tente novamente");
        });

      return;
    }
    handleUpload();
  }

  async function handleUpload() {
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
          })
          .catch((error) => {
            console.log(error);
            toast.error("Algo deu errado, tente novamente.");
          });
      });
    });
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
                  <FaRegUserCircle size={52} />
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
              <button className="btn-back" onClick={() => setIsEditing(false)}>
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
                  <FaRegUserCircle size={52} />
                )}
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
