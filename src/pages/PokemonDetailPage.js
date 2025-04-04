import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaArrowLeft, FaWeightHanging, FaRulerVertical, FaStar } from 'react-icons/fa';

const DetailPageContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const BackButton = styled(motion.button)`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 2rem;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  transition: all 0.3s ease;
  color: #333;
  
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const DetailCard = styled.div`
  background: linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.6) 100%);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  overflow: hidden;
  position: relative;
  
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
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const PokemonInfo = styled.div`
  flex: 1;
`;

const PokemonName = styled.h1`
  font-size: 3rem;
  margin: 0;
  text-transform: capitalize;
  color: #333;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const PokemonId = styled.div`
  font-size: 1.2rem;
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: 1rem;
  font-weight: 500;
`;

const TypeContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const TypeBadge = styled.span`
  background: ${props => getTypeColor(props.type)};
  color: white;
  border-radius: 50px;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  text-transform: capitalize;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const PokemonImageContainer = styled.div`
  width: 300px;
  height: 300px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
    margin: 0 auto;
  }
`;

const DetailContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatsContainer = styled.div`
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  padding: 1.5rem;
`;

const SectionTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #333;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatBar = styled.div`
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const StatInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const StatName = styled.span`
  text-transform: capitalize;
  font-weight: 500;
  color: #333;
`;

const StatValue = styled.span`
  font-weight: 600;
  color: #333;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 10px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  background: ${props => getStatColor(props.value)};
  width: ${props => Math.min(100, (props.value / 255) * 100)}%;
  border-radius: 10px;
  transition: width 1s ease;
`;

const PhysicalContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const PhysicalStat = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PhysicalValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 0.5rem;
`;

const PhysicalLabel = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.25rem;
`;

const AbilitiesContainer = styled.div`
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  padding: 1.5rem;
`;

const AbilityItem = styled.div`
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const AbilityName = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  text-transform: capitalize;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  
  span {
    margin-left: 0.5rem;
    font-size: 0.8rem;
    background: ${props => props.hidden ? '#e74c3c' : '#2ecc71'};
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-weight: 500;
  }
`;

const AbilityDescription = styled.div`
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  font-size: 1.5rem;
  color: #666;
`;

function getTypeColor(type) {
  const typeColors = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
    default: '#68A090'
  };
  
  return typeColors[type] || typeColors.default;
}

function getStatColor(value) {
  if (value < 50) return '#ff5959';
  if (value < 90) return '#ff9c54';
  if (value < 120) return '#ffde59';
  if (value < 150) return '#a7db8d';
  return '#75dbcd';
}

function convertHeight(height) {
  // Height is in decimeters, convert to meters and feet/inches
  const meters = height / 10;
  const feet = Math.floor(meters * 3.281);
  const inches = Math.round((meters * 3.281 - feet) * 12);
  
  return `${meters.toFixed(1)}m (${feet}'${inches}")`;
}

function convertWeight(weight) {
  // Weight is in hectograms, convert to kg and lbs
  const kg = weight / 10;
  const lbs = Math.round(kg * 2.205);
  
  return `${kg.toFixed(1)}kg (${lbs}lbs)`;
}

const PokemonDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [abilities, setAbilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon(response.data);
        
        // Fetch ability descriptions
        const abilitiesDetails = await Promise.all(
          response.data.abilities.map(async (ability) => {
            const abilityResponse = await axios.get(ability.ability.url);
            
            // Find English description
            const englishDescription = abilityResponse.data.effect_entries.find(
              entry => entry.language.name === 'en'
            );
            
            return {
              ...ability,
              name: ability.ability.name,
              hidden: ability.is_hidden,
              description: englishDescription ? englishDescription.effect : 'No description available.'
            };
          })
        );
        
        setAbilities(abilitiesDetails);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchPokemonDetails();
  }, [id]);
  
  if (loading) {
    return (
      <DetailPageContainer>
        <BackButton 
          onClick={() => navigate('/')}
          whileHover={{ x: -5 }}
        >
          <FaArrowLeft /> Back to list
        </BackButton>
        <LoadingContainer>Loading Pokémon details...</LoadingContainer>
      </DetailPageContainer>
    );
  }
  
  if (error) {
    return (
      <DetailPageContainer>
        <BackButton 
          onClick={() => navigate('/')}
          whileHover={{ x: -5 }}
        >
          <FaArrowLeft /> Back to list
        </BackButton>
        <DetailCard>
          <h2>Error loading Pokémon: {error}</h2>
          <p>Please try again later or select a different Pokémon.</p>
        </DetailCard>
      </DetailPageContainer>
    );
  }
  
  if (!pokemon) return null;
  
  const mainType = pokemon.types[0].type.name;
  
  return (
    <DetailPageContainer>
      <BackButton 
        onClick={() => navigate('/')}
        whileHover={{ x: -5 }}
      >
        <FaArrowLeft /> Back to list
      </BackButton>
      
      <DetailCard type={mainType}>
        <DetailHeader>
          <PokemonInfo>
            <PokemonId>#{pokemon.id.toString().padStart(3, '0')}</PokemonId>
            <PokemonName>{pokemon.name}</PokemonName>
            <TypeContainer>
              {pokemon.types.map((typeInfo, index) => (
                <TypeBadge key={index} type={typeInfo.type.name}>
                  {typeInfo.type.name}
                </TypeBadge>
              ))}
            </TypeContainer>
          </PokemonInfo>
          
          <PokemonImageContainer>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
              alt={pokemon.name}
            />
          </PokemonImageContainer>
        </DetailHeader>
        
        <DetailContent>
          <div>
            <PhysicalContainer>
              <PhysicalStat>
                <FaWeightHanging size={24} color="#666" />
                <PhysicalValue>{convertWeight(pokemon.weight)}</PhysicalValue>
                <PhysicalLabel>Weight</PhysicalLabel>
              </PhysicalStat>
              
              <PhysicalStat>
                <FaRulerVertical size={24} color="#666" />
                <PhysicalValue>{convertHeight(pokemon.height)}</PhysicalValue>
                <PhysicalLabel>Height</PhysicalLabel>
              </PhysicalStat>
            </PhysicalContainer>
            
            <AbilitiesContainer>
              <SectionTitle>
                <FaStar /> Abilities
              </SectionTitle>
              {abilities.map((ability, index) => (
                <AbilityItem key={index}>
                  <AbilityName hidden={ability.hidden}>
                    {ability.name.replace('-', ' ')}
                    {ability.hidden && <span>Hidden</span>}
                  </AbilityName>
                  <AbilityDescription>{ability.description}</AbilityDescription>
                </AbilityItem>
              ))}
            </AbilitiesContainer>
          </div>
          
          <StatsContainer>
            <SectionTitle>Base Stats</SectionTitle>
            {pokemon.stats.map((stat, index) => (
              <StatBar key={index}>
                <StatInfo>
                  <StatName>{stat.stat.name.replace('-', ' ')}</StatName>
                  <StatValue>{stat.base_stat}</StatValue>
                </StatInfo>
                <ProgressBarContainer>
                  <ProgressBar value={stat.base_stat} />
                </ProgressBarContainer>
              </StatBar>
            ))}
          </StatsContainer>
        </DetailContent>
      </DetailCard>
    </DetailPageContainer>
  );
};

export default PokemonDetailPage;
