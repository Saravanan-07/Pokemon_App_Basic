import React from 'react';
import '../assets/Card.css';

const PokemonCard = ({ pokemon }) => {
  return (
    <div className='card'>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} className='pok_img' />
      <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
    </div>
  );
};

export default PokemonCard;
