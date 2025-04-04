import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';

const HeaderContainer = styled.header`
  background: linear-gradient(to right, #ee0979, #ff6a00);
  padding: 1rem 2rem;
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  
  img {
    height: 40px;
    margin-right: 1rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    
    img {
      height: 30px;
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const GithubLink = styled.a`
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  @media (max-width: 768px) {
    span {
      display: none;
    }
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          <span>Pokémon Showcase</span>
        </Logo>
        
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <GithubLink 
            href="https://github.com/kaalpanikh/pokemon-showcase" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <FaGithub />
            <span>GitHub</span>
          </GithubLink>
        </NavLinks>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
