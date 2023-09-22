import { Link } from "react-router-dom"
import './header.css'

function Header() {
  return (
    <header>
      <div className="container">
        <Link className="logo" to="/">YourMovie<span>.com</span></Link>
        <Link className="meus-filmes" to="/favoritos">Meus Filmes</Link>
      </div>
    </header>
  )
}

export default Header