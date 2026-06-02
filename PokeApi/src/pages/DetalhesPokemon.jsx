import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { buscarPokemon } from "../services/buscarPokemons"

function DetalhesPokemon() {

   const { id } = useParams()

   const [pokemon, setPokemon] = useState(null)

   useEffect(() => {

      buscarPokemon(id).then((dados)=>{
         setPokemon(dados)
      })

   }, [id])

    if (!pokemon) {
    return <Loading />
    }


   return(

     <>
  <h1>
    #{pokemon.id} - {pokemon.name}
  </h1>

  <img
    src={pokemon.sprites.front_default}
    alt={pokemon.name}
  />

  <p>Experiência: {pokemon.base_experience}</p>

  <p>Altura: {pokemon.height}</p>

  <p>Peso: {pokemon.weight}</p>

  <h3>Tipos</h3>

  {pokemon.types.map((tipo) => (

      <p key={tipo.type.name}>
          {tipo.type.name}
      </p>

  ))}

  <h3>Habilidades</h3>

  {pokemon.abilities.map((habilidade)=>(

      <p key={habilidade.ability.name}>
          {habilidade.ability.name}
      </p>

  ))}

  <h3>Estatísticas</h3>

  {pokemon.stats.map((stat)=>(

      <p key={stat.stat.name}>
          {stat.stat.name} :
          {stat.base_stat}
      </p>

  ))}

</>
   )
}

export default DetalhesPokemon