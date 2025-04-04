import { useState, useEffect } from 'react';
import axios from 'axios';

const usePokemonData = (limit = 20, offset = 0) => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let isMounted = true;
    
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        
        // Get the initial list
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        
        if (!isMounted) return;
        
        setTotal(response.data.count);
        setHasMore(response.data.next !== null);
        
        // Fetch detailed data for each Pokemon
        const pokemonDetails = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const detailResponse = await axios.get(pokemon.url);
            return detailResponse.data;
          })
        );
        
        if (!isMounted) return;
        
        setPokemons(pokemonDetails);
        setLoading(false);
      } catch (err) {
        if (!isMounted) return;
        
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchPokemon();
    
    return () => {
      isMounted = false;
    };
  }, [limit, offset]);
  
  return { pokemons, loading, error, hasMore, total };
};

export default usePokemonData;
