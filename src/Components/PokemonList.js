import PokemonItem from './PokemonItem';
import './style.css';

const PokemonList = ({ pokemons, numberOfPokemons, sortByName }) => {
  // take list of pokemon and sort when click on icon in component Filter
  // slice method to limit sorting pokemon, default value of numberOfPokemons is 20, when click button increase 10
  const sortedByName = pokemons
    .slice(0, numberOfPokemons)
    .sort((a, b) => (sortByName ? a.id - b.id : b.id - a.id));

  return (
    <ul className="pokemon-list">
      {/* take sorted or no and render */}
      {sortedByName.map((pokemon) => (
        <PokemonItem
          name={pokemon.name}
          types={pokemon.types}
          sprite={pokemon.sprites.front_default}
          weight={pokemon.weight}
          height={pokemon.height}
          key={pokemon.name}
        />
      ))}
    </ul>
  );
};
export default PokemonList;
