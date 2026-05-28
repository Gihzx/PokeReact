import { useEffect, useState } from "react";
import { BuscarPokemons } from "../services/BuscarPokemons";
import { Link } from "react-router-dom"
function Home (){
const [pokeAll, setPokeAll] = useState([])
const [offset, setOffset] = useState(0)



useEffect(() => {
 
   BuscarPokemons(offset).then((dados) => {
    setPokeAll(dados)
  })

}, [offset])

function proximaPagina(){
  setOffset(offset + 20)
}
function paginaAnterior(){
  if(offset > 0){
    setOffset(offset - 20)
  }else{
    console.log("Não é possível voltar para a página anterior")
  }
}
  return (
    <>
      {pokeAll.map((pokemon) => (
    <Link
        key={pokemon.id}
        to={`pokemon/${pokemon.id}`}
    >
        <div>
        #{pokemon.id} - {pokemon.name}

        <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
        />
        </div>
    </Link>
      ))}

      <button onClick={paginaAnterior}>Anterior</button>
      <button onClick={proximaPagina}>Próxima</button>
    </>
    )
}



export default Home;