import { useEffect, useState } from "react";
import {
  BuscarPokemons,
  buscarTipos,
  buscarPokemonPorTipo
} from "../services/BuscarPokemons";

import { Cards } from "../components/Cards";
import FilterType from "../components/FilterType";
import SearchPokemon from "../components/SearchPokemon";
import Loading from "../components/Loading";

function Home() {

  const [pokeAll, setPokeAll] = useState([]);
  const [offset, setOffset] = useState(0);

  const [tipos, setTipos] = useState([]);
  const [tipoSelecionado, setTipoSelecionado] = useState("");

  const [busca, setBusca] = useState("");

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

  // Busca por nome (client-side)
  const pokemonsFiltrados = pokeAll.filter((pokemon) =>
    pokemon.name
      .toLowerCase()
      .includes(busca.toLowerCase())
  );

  return (
    <>
      {erro && (
        <p>{erro}</p>
      )}

      {loading && (
        <Loading />
      )}

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
        <p>
          Total de Pokémon do tipo {tipoSelecionado}: {pokeAll.length}
        </p>
      )}

      {pokemonsFiltrados.map((pokemon) => (
        <Cards
          key={pokemon.id}
          pokemon={pokemon}
        />
      ))}

      {tipoSelecionado === "" && (
        <>
          <button onClick={paginaAnterior}>
            Anterior
          </button>

          <button onClick={proximaPagina}>
            Próxima
          </button>
        </>
      )}
    </>
  );
}

export default Home;