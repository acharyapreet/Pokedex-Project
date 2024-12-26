import { useEffect, useState } from "react";
import axios from "axios";
import usePokemonList from './usePokemonList';

function usePokemonDetails(id) {
    const [pokemon, setPokemon] = useState({});
    const [PokemonListState, setPokemonListState] = usePokemonList(true);

    async function downloadPokemon() {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemonOfSameTypeResponse = await axios.get(`https://pokeapi.co/api/v2/type/${response.data.types ? response.data.types[0].type.name : ''}`);
        
        setPokemon(state => ({
            ...state,
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map((t) => t.type.name),
            similarPokemons: pokemonOfSameTypeResponse.data.pokemon ? pokemonOfSameTypeResponse.data.pokemon.slice(0, 5) : []
        }));

        setPokemonListState({ ...PokemonListState, type: response.data.types ? response.data.types[0].type.name : '' });
    }

    useEffect(() => {
        downloadPokemon();
        console.log('list', pokemon.types);
    }, [id]);

    return [pokemon, PokemonListState];
}

export default usePokemonDetails;