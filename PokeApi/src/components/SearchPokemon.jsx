function SearchPokemon({ busca, onBuscar }) {

  return (
    <input
      type="text"
      value={busca}
      onChange={(e) => onBuscar(e.target.value)}
    />
  )

}

export default SearchPokemon