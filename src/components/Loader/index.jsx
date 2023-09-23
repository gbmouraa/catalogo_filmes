import './loader.css'

function Loader() {
  return (
    <div className="loading-container">
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default Loader