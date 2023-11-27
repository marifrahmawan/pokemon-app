import PokemonLogo from './assets/International_Pokémon_logo.svg.png';

import PokemonCardContainer from './components/PokemonCardContainer';
import PokemonDetails from './components/PokemonDetails';
import usePokemonStore from './store/pokemon-store';

function App() {
  const showDetails = usePokemonStore((state) => state.showDetails);

  return (
    <div className='flex bg-gray-100'>
      <div className="container">
        <div className="flex my-7 w-full justify-center">
          <img src={PokemonLogo} alt="Pokemon Logo" className="h-[150px]" />
        </div>
        <PokemonCardContainer />
      </div>

      <div className="absolute left-0 top-0">
        <div
          className={`${showDetails ? 'block' : 'hidden'} fixed h-full w-full bg-black/90 hover:cursor-pointer`}
        ></div>
      </div>

      <div className="absolute left-0 top-0">
        <div
          className={`${
            showDetails ? '' : 'translate-y-full'
          } fixed right-0 top-0 z-10 flex  h-full w-full justify-center transition-all duration-700 ease-in-out`}
        >
          <div className="flex h-full w-[800px] justify-center pt-14">
            <PokemonDetails />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
