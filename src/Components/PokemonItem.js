import { useState } from 'react';
import './style.css';

const PokemonItem = ({ name, types, sprite, weight, height }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <li
      role="presentation"
      className="pokemon-item animation-li"
      // show more/less info when click on pokemon list
      onClick={() => {
        setShowMore(!showMore);
      }}
    >
      <img className="pokemon-sprite" src={sprite} alt={name} />
      <div className="details-container">
        <div className="pokemon-details">
          <h3>NAME</h3>
          <h3>TYPE</h3>
          {showMore && (
            <>
              <h3>WEIGHT</h3>
              <h3>HEIGHT</h3>
            </>
          )}
        </div>
        <div className="pokemon-details">
          <p>{name}</p>
          <div>
            {types.map((type, i) => (
              <p key={i}>{type.type.name}</p>
            ))}
          </div>
          {showMore && (
            <>
              <p>{weight}</p>
              <p>{height}</p>
            </>
          )}
        </div>
      </div>
    </li>
  );
};

export default PokemonItem;
