import api from "../Api"

export const BuscarPokemons = async (offset) => {

    const response = await api.get(`/pokemon?offset=${offset}&limit=20`)
    const lista = response.data.results

    const detalhes = await Promise.all(
        lista.map(async (pokemon) => {

            const detalhe = await api.get(pokemon.url)

            return detalhe.data
        })
    )

    return detalhes
}
export const buscarPokemon = async (id) => {

    const response = await api.get(`/pokemon/${id}`)

    return response.data
}
