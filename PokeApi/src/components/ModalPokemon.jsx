function ModalPokemon({ pokemon, onClose }) {

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl p-6 w-[500px] max-h-[80vh] overflow-y-auto">

        <button
          onClick={onClose}
          className="float-right text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">
          #{pokemon.id} - {pokemon.name}
        </h2>

        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          className="mx-auto"
        />

      <div className="grid grid-cols-3 gap-4 text-center my-4">

  <div>
    <p className="font-bold">EXP</p>
    <p>{pokemon.base_experience}</p>
  </div>

  <div>
    <p className="font-bold">Altura</p>
    <p>{pokemon.height}</p>
  </div>

  <div>
    <p className="font-bold">Peso</p>
    <p>{pokemon.weight}</p>
  </div>

</div>

        <h3 className="font-bold mt-4">
          Tipos
        </h3>

       <div className="flex gap-2 flex-wrap mt-2">
  {pokemon.types.map((tipo) => (
    <span
      key={tipo.type.name}
      className="
        bg-blue-500
        text-white
        px-2  
        py-1
        rounded-full
        text-sm
      "
    >
      {tipo.type.name}
    </span>
  ))}
</div>

        <h3 className="font-bold mt-4">
          Habilidades
        </h3>

        {pokemon.abilities.map((habilidade) => (
          <p key={habilidade.ability.name}>
            {habilidade.ability.name}
          </p>
        ))}

        <h3 className="font-bold mt-4">
          Estatísticas
        </h3>

        {pokemon.stats.map((stat) => (
          <p key={stat.stat.name}>
            {stat.stat.name}: {stat.base_stat}
          </p>
        ))}

      </div>

    </div>
  );
}

export default ModalPokemon;