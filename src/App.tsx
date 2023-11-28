import { useEffect } from 'react';

import PokemonLogo from './assets/International_Pokémon_logo.svg.png';
import pokeBallPict from './assets/pokeball.png';

import PokemonCardContainer from './components/PokemonCardContainer';
import PokemonDetailsFlyOut from './components/PokemonDetailsFlyOut';
import usePokemonStore from './store/pokemon-store';

function App() {
  const showDetails = usePokemonStore((state) => state.showDetails);
  const setShowDetails = usePokemonStore((state) => state.setShowDetails);
  const setShowMyPokemon = usePokemonStore((state) => state.setShowMyPokemon);

  const showMyPokemonList = () => {
    setShowMyPokemon(true);
    setShowDetails(true);
  };

  useEffect(() => {
    const myPokemon = localStorage.getItem('myPokemon');
    if (!myPokemon) {
      localStorage.setItem('myPokemon', '[]');
    }
  }, []);

  return (
    <div className="relative flex bg-gray-100">
      <button className="fixed right-10 top-10 z-[3] h-[60px] w-[60px]" onClick={() => showMyPokemonList()}>
        <img
          src={pokeBallPict}
          alt="My Pokemon"
          className="h-full w-full animate-bounce object-cover hover:cursor-pointer"
        />
      </button>

      <div className="container">
        <div className="my-7 flex w-full justify-center">
          <img src={PokemonLogo} alt="Pokemon Logo" className="h-[150px]" />
        </div>
        <PokemonCardContainer />
      </div>

      <div className="absolute left-0 top-0">
        <div
          className={`${showDetails ? 'block' : 'hidden'} fixed z-10 h-full w-full bg-black/90 hover:cursor-pointer`}
        ></div>
      </div>

      <div className="absolute left-0 top-0">
        <div
          className={`${
            showDetails ? '' : 'translate-y-full'
          } fixed right-0 top-0 z-10 flex  h-full w-full justify-center transition-all duration-700 ease-in-out`}
        >
          <div className="flex h-full w-[800px] justify-center pt-14">
            <PokemonDetailsFlyOut />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
