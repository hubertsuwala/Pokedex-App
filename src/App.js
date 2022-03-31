import { useState, useEffect } from 'react';
import Main from './Components/Main';
import Filter from './Components/Filter';
import PokemonList from './Components/PokemonList';
import Loader from './Components/Loader';

import './Components/style.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon');

  const [isLoading, setIsLoading] = useState(true);
  const [sortByName, SetSortByName] = useState(true);
  const [error, setError] = useState();

  const fetchPokemons = async () => {
    // setIsLoading(true);
    const response = await fetch(loadMore);
    if (!response.ok) {
      throw new Error('Something goes wrong!');
    }
    const data = await response.json();

    setLoadMore(data.next);

    const fetchPokemon = (results) => {
      results.forEach(async (pokemon) => {
        const res = await fetch(pokemon.url);
        const dataPokemon = await res.json();

        setPokemons((currentList) => [...currentList, dataPokemon]);
        setIsLoading(false);
      });
    };
    fetchPokemon(data.results);
  };
  useEffect(() => {
    fetchPokemons().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  if (error) {
    console.log(error);
  }
  return (
    <Main>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          {' '}
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <Filter onSort={SetSortByName} pok={pokemons} />
              <PokemonList pokemons={pokemons} sortByName={sortByName} />
              <button
                className="button"
                type="button"
                onClick={() => {
                  console.log('tesr');
                  fetchPokemons();
                }}
              >
                Show more
              </button>
            </>
          )}
        </>
      )}
    </Main>
    // <Main>
    //   {/* depends on isloading state render below */}
    //   {!isLoading && <Filter onSort={SetSortByName} />}
    //   {!isLoading && pokemons.length > 0 && (
    //     <PokemonList
    //       pokemons={pokemons}
    //       numberOfPokemons={numberOfPokemons}
    //       sortByName={sortByName}
    //     />
    //   )}
    //   {isLoading && <Loader />}
    //   {!isLoading && pokemons.length === 0 && <p>No pokemons to display</p>}
    //   {!isLoading && (
    //     // on click trigger loadMore() which increase state numberOfPokemons +10
    //     <button className="button" type="button" onClick={loadMore}>
    //       Show more
    //     </button>
    //   )}
    // </Main>
  );
}

export default App;
