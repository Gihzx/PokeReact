function SearchPokemon({ busca, onBuscar }) {

  return (
    <input
    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#63d482]" 
      type="text"
      value={busca}
      onChange={(e) => onBuscar(e.target.value)}
    />
  )

}

export default SearchPokemon