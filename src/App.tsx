import PokemonCardContainer from './components/PokemonCardContainer';
import PokemonDetails from './components/PokemonDetails';

function App() {
  return (
    <div className="flex min-h-screen min-w-fit bg-slate-200">
      <div className="container relative flex h-full w-full">
        <div className="flex w-full lg:w-[70%] justify-center items-center">
          <PokemonCardContainer />
        </div>

        <div className="fixed bottom-[30px] right-0 h-screen w-[550px] pt-28 hidden lg:block">
          <PokemonDetails />
        </div>
      </div>
    </div>
  );
}

export default App;
