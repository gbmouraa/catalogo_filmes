import "./modalLogout.scss";

function ModalLogout(props) {
  return (
    <div className="container-modal-logout">
      <div className="modal-logout">
        <span>Tem certeza que deseja sair?</span>
        <div className="actions">
          <button className="btn-sair" onClick={props.sair}>
            Sair
          </button>
          <button className="btn-voltar" onClick={props.voltar}>
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalLogout;
