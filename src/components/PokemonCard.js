import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getTypeColor } from '../constants/pokemonTypes';

const Card = styled(motion.div)`
  background: linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.6) 100%);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  height: 100%;
  transition: all 0.3s ease;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => getTypeColor(props.type)};
    opacity: 0.1;
    z-index: -1;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 32px rgba(31, 38, 135, 0.25);
    
    .pokemon-image {
      transform: scale(1.1);
    }
  }
`;

const PokemonImage = styled.div`
  width: 180px;
  height: 180px;
  margin-bottom: 1rem;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;
  }
`;

const PokemonId = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  color: rgba(0, 0, 0, 0.3);
  font-weight: bold;
  font-size: 1rem;
`;

const PokemonName = styled.h2`
  margin: 0.5rem 0;
  font-size: 1.5rem;
  text-transform: capitalize;
  color: #333;
  font-weight: 700;
  text-align: center;
`;

const TypeBadge = styled.span`
  background: ${props => getTypeColor(props.type)};
  color: white;
  border-radius: 50px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  margin: 0.25rem;
  text-transform: capitalize;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const TypeContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const PokemonCard = ({ pokemon }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/pokemon/${pokemon.id}`);
  };
  
  return (
    <Card 
      type={pokemon.types[0].type.name}
      onClick={handleClick}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <PokemonId>#{pokemon.id.toString().padStart(3, '0')}</PokemonId>
      <PokemonImage className="pokemon-image">
        <img 
          src={pokemon.sprites.other['official-artwork'].front_default || 
               pokemon.sprites.front_default} 
          alt={pokemon.name} 
        />
      </PokemonImage>
      <PokemonName>{pokemon.name}</PokemonName>
      <TypeContainer>
        {pokemon.types.map((typeInfo, index) => (
          <TypeBadge key={index} type={typeInfo.type.name}>
            {typeInfo.type.name}
          </TypeBadge>
        ))}
      </TypeContainer>
    </Card>
  );
};

export default PokemonCard;
