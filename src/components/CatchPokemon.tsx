/* eslint-disable @typescript-eslint/no-explicit-any */
import CloseSVG from '../assets/CloseSVG';
import usePokemonStore from '../store/pokemon-store';
import player from '../assets/15-159647_pokemon-red-8-bit-hd-png-download.png';
import pokeBallPict from '../assets/pokeball8bit.png';
import { useState } from 'react';

interface IProps {
  data: any;
}

const CatchPokemon = (props: IProps) => {
  const { data } = props;

  const setShowDetails = usePokemonStore((state) => state.setShowDetails);
  const setIsCatching = usePokemonStore((state) => state.setIsCatching);
  const loadPokemonDetail = usePokemonStore((state) => state.loadPokemonDetail);
  const setShowMyPokemon = usePokemonStore((state) => state.setShowMyPokemon);
  const setMyPokemon = usePokemonStore((state) => state.setMyPokemon);

  const [isCatchSuccess, setIsCatchSuccess] = useState<boolean>();

  let imageUrl = '';

  if (data.id < 899) {
    imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${data.id}.gif`;
  } else {
    imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`;
  }

  const closeHandler = () => {
    setShowDetails(false);
    setIsCatching(false);
    loadPokemonDetail({});
  };

  const catchPokemonHandler = () => {
    const percentageSuccess = Math.random() * 100;
    if (percentageSuccess > 50) {
      setIsCatchSuccess(true);
      const myPokemon = JSON.parse(localStorage.getItem('myPokemon') || '');

      const pokemonName = prompt('Name Your Pokemon');

      const pokemonData = { id: myPokemon.length + 1, myPokemonName: pokemonName, pokemonData: data };
      localStorage.setItem('myPokemon', JSON.stringify([...myPokemon, pokemonData]));

      setMyPokemon([...myPokemon, pokemonData]);

      setTimeout(() => {
        setIsCatching(false);
        setShowMyPokemon(true);
      }, 2000);
    } else {
      setIsCatchSuccess(false);
    }
  };

  return (
    <div className="relative h-full w-full rounded-t-xl bg-white bg-pokemon-habitat bg-cover bg-center bg-no-repeat px-4">
      <div className="relative w-full">
        <button
          className="absolute right-0 top-0 z-10 mt-2 h-[45px] w-[45px] hover:cursor-pointer"
          onClick={() => closeHandler()}
        >
          <CloseSVG />
        </button>
      </div>

      {isCatchSuccess === false && (
        <p className="absolute bottom-[220px] left-11 animate-bounce font-press">Try Again !!</p>
      )}

      {isCatchSuccess === true && (
        <p className="absolute bottom-[220px] left-11 animate-bounce font-press">Yeayyyy !!!</p>
      )}

      <div className={`relative flex w-full justify-center ${isCatchSuccess ? 'hidden' : ''}`}>
        <img src={imageUrl} alt={data.name} className="absolute right-[30px] top-[300px] min-h-[180px] min-w-[180px]" />
      </div>
      <img src={player} alt="player" className="absolute bottom-0 h-[200px] w-[200px]" />
      <div className="flex w-full justify-center">
        <button onClick={() => catchPokemonHandler()}>
          <img
            src={pokeBallPict}
            alt="pokemon ball"
            className={`absolute bottom-[60px] h-[70px] w-[70px]  hover:cursor-pointer ${
              isCatchSuccess === true ? 'animate-bounce' : 'animate-spin'
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default CatchPokemon;
