import { useEffect, useState } from "react";
import axios from "axios";
function usePokemonList(){
    {/*create a state variable pokemonListState and setPokemonListState function to update the state*/}
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList : [],
        isLoading : true,
        pokedexUrl : 'https://pokeapi.co/api/v2/pokemon',
        nextUrl : '',
        prevUrl : ''
    });
    {/*create a function downloadPokemon to fetch the pokemon data from the pokedexUrl*/}
    async function downloadPokemon(){
        {/*set isLoading to true*/}
        setPokemonListState({...pokemonListState, isLoading : true});
        {/*fetch the pokemon data from the pokedexUrl inside pokemonListState*/}
        const response = await axios.get(pokemonListState.pokedexUrl);
        {/**we got name and url of each pokemon */}
        const pokemonResults = response.data.results;
        console.log('response is',response.data.pokemon);
        {/**set the nextUrl and prevUrl in pokemonListState */}
        setPokemonListState((state) => ({...state, 
            nextUrl : response.data.next, 
            prevUrl : response.data.previous
        }));
        {/**fetch the pokemon data from the url of each pokemon */}
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
        {/**wait for all the promises to resolve */}
        const pokemonData = await axios.all(pokemonResultPromise);
        console.log(pokemonData);
        {/**map over the pokemonData and return the id, name, image and types of*/}
        const pokeListResult = pokemonData.map((pokeData)=>{
            const pokemon = pokeData.data;
            {/*return the id, name, image and types of each pokemon */}
            return {
                   id : pokemon.id,

                    name : pokemon.name ,
                    image : (pokemon.sprites.other.dream_world.front_default) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                    types : pokemon.types
            }
        });
    
        console.log(pokeListResult);
        setPokemonListState((state)=>({...state, 
            pokemonList : pokeListResult,
            isLoading : false
    }));

    }
    useEffect(() => {
         downloadPokemon();
     },[pokemonListState.pokedexUrl])
     return [pokemonListState, setPokemonListState]

}
 export default usePokemonList;