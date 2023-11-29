/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import CloseSVG from '../assets/CloseSVG';
import usePokemonStore from '../store/pokemon-store';
import PokemonCard from './PokemonCard';

const MyPokemonList = () => {
  const setShowMyPokemon = usePokemonStore((state) => state.setShowMyPokemon);
  const setShowDetails = usePokemonStore((state) => state.setShowDetails);
  const setIsCatching = usePokemonStore((state) => state.setIsCatching);
  const loadPokemonDetail = usePokemonStore((state) => state.loadPokemonDetail);
  const myPokemon = usePokemonStore((state) => state.myPokemon);

  const closeHandler = () => {
    setShowDetails(false);
    setIsCatching(false);
    setShowMyPokemon(false);
    loadPokemonDetail({});
  };

  useEffect(() => {}, [myPokemon]);

  return (
    <div className="h-full w-full overflow-y-auto rounded-t-xl bg-gray-100 px-4">
      <div className="relative w-full">
        <button
          className="absolute right-0 top-0 z-10 mt-2 h-[45px] w-[45px] hover:cursor-pointer"
          onClick={() => closeHandler()}
        >
          <CloseSVG />
        </button>
      </div>
      <div className="mt-9 flex w-full justify-center">
        <p className="rounded-full bg-indigo-200 px-4 py-1 text-[24px] font-bold">My Pokemon</p>
      </div>

      {myPokemon.length === 0 && (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-[22px] font-bold text-gray-400">Go Catch Some Pokemons</p>
        </div>
      )}

      <div className="grid grid-cols-2 justify-items-center gap-2 pt-7 lg:grid-cols-3">
        {myPokemon.map((myPokemon: any) => (
          <PokemonCard
            key={myPokemon.id}
            id={myPokemon.pokemonData.id}
            name={myPokemon.pokemonData.name}
            types={myPokemon.pokemonData.types}
            data={myPokemon.pokemonData}
            myPokemonId={myPokemon.id}
            myPokemonName={myPokemon.myPokemonName}
            onDelete={true}
          />
        ))}
      </div>
    </div>
  );
};

export default MyPokemonList;
