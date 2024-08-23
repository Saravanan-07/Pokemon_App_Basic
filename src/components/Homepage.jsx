import React,{useEffect, useState} from 'react';
import axios from 'axios';
import PokemonCard from './Card';
import '../assets/Homepage.css';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10');
        const promises = response.data.results.map((pokemon) => axios.get(pokemon.url));
        const pokemonData = await Promise.all(promises);
        setPokemonList(pokemonData.map((data) => data.data));
      } catch (error) {
        console.error('Error fetching the Pokémon data:', error);
      }
    };
    fetchPokemon();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="container">
      <h1>Pokemon Cards</h1>
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearchChange}
        className="searchBar"
      />
      <div className="grid">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default App;
