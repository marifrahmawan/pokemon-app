import PokemonCardContainer from './components/PokemonCardContainer';
import PokemonDetails from './components/PokemonDetails';
import usePokemonStore from './store/pokemon-store';

function App() {
  const pokemonDetail = usePokemonStore((state) => state.pokemonDetail);

  console.log(pokemonDetail);

  return (
    <div className="flex min-h-screen min-w-full bg-slate-200">
      <div className="container relative flex h-full w-full">
        <div className="flex w-[70%] pr-6">
          <PokemonCardContainer />
        </div>
        <div className="sticky top-0 h-screen w-[30%] pt-28">
          <PokemonDetails />
        </div>
      </div>
    </div>
  );
}

export default App;
