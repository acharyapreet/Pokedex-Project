import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";
//usePokemonList hook
import usePokemonList from '../hooks/usePokemonList';

function PokemonList() {
    //make pokemonListState and setPokemonListState from usePokemonList

    const [pokemonListState, setPokemonListState] = usePokemonList(false);

    return (
        <div className="Pokemon-list-wrapper">
            <div className="pokemon-wrapper">
               {/*map over the pokemonListState.pokemonList and return a Pokemon component for each pokemon*/}
                {pokemonListState.isLoading ? 'Loading' :
                    pokemonListState.pokemonList.map((p) => (
                        <Pokemon
                            name={p.name}
                            image={p.image}
                            key={p.id}
                            id={p.id}
                        />
                    ))
                }
            </div>
            <div className="controls">
                {/*add onClick handlers to the buttons to change the pokedexUrl in pokemonListState*/}
                
                <button
                    disabled={pokemonListState.prevUrl == null}
                    onClick={() => setPokemonListState({ ...pokemonListState, pokedexUrl: pokemonListState.prevUrl })}
                >
                    Prev
                </button>
                <button
                    disabled={pokemonListState.nextUrl == null}
                    onClick={() => setPokemonListState({ ...pokemonListState, pokedexUrl: pokemonListState.nextUrl })}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default PokemonList;
