# Pokémon Card Showcase

A modern, responsive React application that displays Pokémon cards with detailed information using the PokéAPI.

![Pokemon Card Showcase](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png)

## Features

- **Beautiful Card UI**: Modern card design with type-based color theming
- **Responsive Layout**: Works on all devices - desktop, tablet, and mobile
- **Detailed Information**: View comprehensive stats, abilities, and physical attributes
- **Search Functionality**: Find Pokémon by name or ID
- **Smooth Animations**: Utilizes Framer Motion for fluid transitions
- **Type-Based Theming**: Cards and detail pages colored based on Pokémon type
- **Load More**: Pagination system to load more Pokémon as needed

## Technologies Used

- React.js
- React Router
- Styled Components
- Framer Motion
- Axios
- React Icons
- PokéAPI

## Installation

1. Clone the repository:
```
git clone https://github.com/kaalpanikh/pokemon-showcase.git
cd pokemon-showcase
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Building for Production

To create a production build:

```
npm run build
```

This will create optimized files in the `build` folder ready for deployment.

## Deployment

This project is deployed at:
- [Netlify](https://pokemon-card-showcase.windsurf.build)
- [Custom Domain](https://pokemon.nikhilmishra.live) (coming soon)

To deploy your own version:
1. Fork this repository
2. Set up a Netlify account
3. Connect your GitHub repository to Netlify
4. Configure build settings with:
   - Build command: `npm run build`
   - Publish directory: `build`

## API Reference

This project uses the [PokéAPI](https://pokeapi.co/) - a free RESTful Pokémon API.

## License

MIT License

## Credits

- [PokéAPI](https://pokeapi.co/) for providing the Pokémon data
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Styled Components](https://styled-components.com/) for styling
