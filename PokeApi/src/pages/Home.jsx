import { useEffect, useState } from "react";
import {
  BuscarPokemons,
  buscarTipos,
  buscarPokemonPorTipo
} from "../services/BuscarPokemons";
import fundo from '../assets/cute-mouse-playing-surfing-with-friends-background-free-vector.jpg'
import { Cards } from "../components/Cards";
import FilterType from "../components/FilterType";
import SearchPokemon from "../components/SearchPokemon";
import Loading from "../components/Loading";  
import { buscarPokemon } from "../services/buscarPokemons";
import ModalPokemon from "../components/ModalPokemon";

function Home() {

  const [pokeAll, setPokeAll] = useState([]);
  const [offset, setOffset] = useState(0);
  const [tipos, setTipos] = useState([]);
  const [tipoSelecionado, setTipoSelecionado] = useState("");
  const [busca, setBusca] = useState("");
  const [pokemonSelecionado, setPokemonSelecionado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  // Buscar pokémons da página atual
  useEffect(() => {

    setLoading(true);

    BuscarPokemons(offset)
      .then((dados) => {
        setErro("");
        setPokeAll(dados);
      })
      .catch(() => {
        setErro("Erro ao carregar Pokémon");
      })
      .finally(() => {
        setLoading(false);
      });

  }, [offset]);

  // Buscar tipos
  useEffect(() => {

    buscarTipos()
      .then((dados) => {
        setTipos(dados);
      });

  }, []);
  useEffect(() => {
  console.log("Pokemon selecionado:", pokemonSelecionado);
}, [pokemonSelecionado]);

  function proximaPagina() {
    setOffset((valorAtual) => valorAtual + 20);
  }

  function paginaAnterior() {

    if (offset > 0) {
      setOffset((valorAtual) => valorAtual - 20);
    }

  }

  async function filtrarTipo(tipo) {

    setTipoSelecionado(tipo);

    try {

      setLoading(true);

      if (tipo === "") {

        const dados = await BuscarPokemons(offset);

        setErro("");
        setPokeAll(dados);

        return;
      }

      const dados = await buscarPokemonPorTipo(tipo);

      setErro("");
      setPokeAll(dados);

    } catch {

      setErro("Erro ao carregar Pokémon");

    } finally {

      setLoading(false);

    }

  }
  async function abrirModal(id) {

  try {

    setLoading(true);

    const dados = await buscarPokemon(id);

    setPokemonSelecionado(dados);

  } catch {

    setErro("Erro ao carregar detalhes do Pokémon");

  } finally {

    setLoading(false);

  }

}

  // Busca por nome (client-side)
  const pokemonsFiltrados = pokeAll.filter((pokemon) =>
    pokemon.name
      .toLowerCase()
      .includes(busca.toLowerCase())
  );

 return (
  <div className="relative min-h-screen overflow-hidden">

    {/* Background */}
    <div
      className="
        absolute
        inset-0
        bg-cover
        bg-center
        bg-no-repeat
        scale-110
        blur-sm
        opacity-80
      "
      style={{ backgroundImage: `url(${fundo})` }}
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/10" />

    {/* Conteúdo */}
    <div className="relative z-10 max-w-7xl mx-auto p-6">

      {erro && (
        <p className="mb-4 text-red-500">
          {erro}
        </p>
      )}

      {loading && <Loading />}

      <SearchPokemon
        busca={busca}
        onBuscar={setBusca}
      />

      <FilterType
        tipos={tipos}
        tipoSelecionado={tipoSelecionado}
        onSelecionarTipo={filtrarTipo}
      />

      {tipoSelecionado && (
        <p className="my-4">
          Total de Pokémon do tipo {tipoSelecionado}: {pokeAll.length}
        </p>
      )}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-6
          mt-6
        "
      >
        {pokemonsFiltrados.map((pokemon) => (
          <Cards
              key={pokemon.id}
              pokemon={pokemon}
              onClick={() => abrirModal(pokemon.id)}
            />
        ))}
      </div>

      {tipoSelecionado === "" && (
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={paginaAnterior}
            className="px-4 py-2 rounded bg-white shadow"
          >
            Anterior
          </button>

          <button
            onClick={proximaPagina}
            className="px-4 py-2 rounded bg-white shadow"
          >
            Próxima
          </button>
        </div>
      )}
      {pokemonSelecionado && (
          <ModalPokemon
        pokemon={pokemonSelecionado}
        onClose={() => setPokemonSelecionado(null)}
      />
      )}
    </div>
  </div>
  
);
}

export default Home;