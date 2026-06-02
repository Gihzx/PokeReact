import { Link } from "react-router-dom"


export function Cards({pokemon}) {

    return (
      <>
      <Link to={`pokemon/${pokemon.id}`}>

        <div>
        #{pokemon.id} - {pokemon.name}

        <img
            src={pokemon?.sprites?.front_default}
            alt={pokemon.name}
        />
        </div>

      </Link>

      </>
    )   
}