import {useParams} from 'react-router-dom'

function Filme(){
  const {id} = useParams()

  return(
    <section>
      <h1>Página filme</h1>
    </section>
  )
}

export default Filme