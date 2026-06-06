export function Cards({ pokemon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="
        border-4
        border-blue-500
        p-4
        block
        hover:shadow-2xl
        transition-shadow
        duration-300
        font-mono
        text-xl
        text-center
        text-[#fc9003]
        uppercase
        cursor-pointer
      "
    >
      <div
        className="
          bg-gray-100
          rounded-lg
          p-4
          hover:bg-gray-300
          transition-colors
        "
      >
        <img
          src={pokemon?.sprites?.front_default}
          alt={pokemon.name}
        />

        {pokemon.id} - {pokemon.name}
      </div>
    </div>
  );
}