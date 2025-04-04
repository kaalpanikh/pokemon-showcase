import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import PokemonCard from '../components/PokemonCard';
import usePokemonData from '../hooks/usePokemonData';
import { FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const HomeContainer = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
  font-weight: 800;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  position: relative;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const SearchInput = styled.input`
  padding: 1rem 1rem 1rem 3rem;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 1rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  outline: none;
  transition: all 0.3s ease;
  
  &:focus {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
`;

const PokemonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1rem;
  }
`;

const LoadMoreButton = styled(motion.button)`
  background: linear-gradient(135deg, #6A11CB 0%, #2575FC 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 50px;
  margin: 3rem auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  margin: 3rem 0;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  margin: 3rem 0;
  font-size: 1.2rem;
  color: #e74c3c;
  padding: 1rem;
  background-color: rgba(231, 76, 60, 0.1);
  border-radius: 8px;
`;

const NoResultsMessage = styled.div`
  text-align: center;
  margin: 3rem 0;
  font-size: 1.2rem;
  color: #666;
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
`;

const HomePage = () => {
  const [offset, setOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const limit = 20;
  
  const { pokemons, loading, error, hasMore } = usePokemonData(limit, offset);
  
  const filteredPokemons = pokemons.filter(pokemon => 
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    pokemon.id.toString() === searchTerm
  );
  
  const handleLoadMore = () => {
    setOffset(prevOffset => prevOffset + limit);
  };
  
  return (
    <HomeContainer>
      <Title>Pokémon Card Showcase</Title>
      
      <SearchContainer>
        <SearchIcon>
          <FaSearch />
        </SearchIcon>
        <SearchInput 
          type="text" 
          placeholder="Search by name or #id..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>
      
      {error && <ErrorMessage>Error: {error}</ErrorMessage>}
      
      {!error && loading && offset === 0 && (
        <LoadingMessage>Loading Pokémon data...</LoadingMessage>
      )}
      
      {!error && !loading && filteredPokemons.length === 0 && (
        <NoResultsMessage>No Pokémon found matching "{searchTerm}"</NoResultsMessage>
      )}
      
      <PokemonGrid>
        {filteredPokemons.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </PokemonGrid>
      
      {!error && hasMore && (
        <LoadMoreButton 
          onClick={handleLoadMore}
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? 'Loading...' : 'Load More'}
          {!loading && (hasMore ? <FaChevronDown style={{marginLeft: '0.5rem'}} /> : <FaChevronUp style={{marginLeft: '0.5rem'}} />)}
        </LoadMoreButton>
      )}
    </HomeContainer>
  );
};

export default HomePage;
