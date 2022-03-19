import { useState, useEffect } from 'react';
import Main from './Components/Main';
import Filter from './Components/Filter';
import PokemonList from './Components/PokemonList';
import Loader from './Components/Loader';

import './Components/style.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedPage, setLoadedPage] = useState(
    'https://pokeapi.co/api/v2/pokemon/?limit=1126'
  );
  const [numberOfPokemons, setNumberOfPokemons] = useState(20);
  const [sortByName, SetSortByName] = useState(true);

  //
  useEffect(() => {
    setIsLoading(true);
    fetch(loadedPage)
      .then((response) => response.json())
      .then((data) => {
        // count give me info how many pokemon i have in list
        // const { count } = data;

        const url = data.results.map((pokemon) => pokemon.url);

        Promise.all(
          url.map((pokemon) =>
            fetch(pokemon)
              .then((res) => res.json())
              .catch((ex) => ex)
          )
        ).then((values) => {
          // set list of pokemon
          setPokemons(values);
          setIsLoading(false);
        });
      });
  }, [loadedPage]);

  const loadMore = () => {
    setNumberOfPokemons(numberOfPokemons + 10);
  };

  return (
    <Main>
      {/* depends on isloading state render below */}
      {!isLoading && <Filter onSort={SetSortByName} />}
      {!isLoading && pokemons.length > 0 && (
        <PokemonList
          pokemons={pokemons}
          numberOfPokemons={numberOfPokemons}
          sortByName={sortByName}
        />
      )}
      {isLoading && <Loader />}
      {!isLoading && pokemons.length === 0 && <p>No pokemons to display</p>}
      {!isLoading && (
        // on click trigger loadMore() which increase state numberOfPokemons +10
        <button className="button" type="button" onClick={loadMore}>
          Show more
        </button>
      )}
    </Main>
  );
}

export default App;
