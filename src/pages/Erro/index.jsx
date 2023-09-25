import {Link} from 'react-router-dom'
import './erro.css'

function Erro() {
  return (
    <section className="container-erro">
      <h1>Página não encontrada, ir para <Link to="/">Home</Link></h1>
    </section>
  )
}

export default Erro;