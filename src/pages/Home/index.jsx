import { useEffect, useState } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import './home.css'

function Home() {
  const [filmes, setFilmes] = useState([])

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "cf0ac2dec34f1b7ed67c633f20a75d67",
          language: "pt-br",
          page: 1
        }
      })
      setFilmes(response.data.results)
    }

    loadFilmes()
  }, [])

  return (
    <section className='container-filmes'>
      {filmes.map(filme => {
        return (
          <article key={filme.id} className='filme'>
            <img src={`https://image.tmdb.org/t/p/original${filme.poster_path}`} alt={filme.title} />
            <div>
              <Link to={`/filme/${filme.id}`}>Acessar</Link>
            </div>
          </article>
        )
      })}
    </section>
  )
}

export default Home