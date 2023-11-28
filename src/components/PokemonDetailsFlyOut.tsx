/* eslint-disable @typescript-eslint/no-explicit-any */
import usePokemonStore from '../store/pokemon-store';
import pokeBallPict from '../assets/pokeball.png';
import { useEffect, useState } from 'react';
import CloseSVG from '../assets/CloseSVG';
import CatchPokemon from './CatchPokemon';
import MyPokemonList from './MyPokemonList';

const PokemonDetails = () => {
  const [species, setSpecies] = useState<any>();
  const [evolution, setEvolution] = useState<any>();

  const pokemonDetail = usePokemonStore((state) => state.pokemonDetail);
  const isLoading = usePokemonStore((state) => state.isLoading);
  const loadPokemonDetail = usePokemonStore((state) => state.loadPokemonDetail);
  const isCatching = usePokemonStore((state) => state.isCatching);
  const showMyPokemon = usePokemonStore((state) => state.showMyPokemon);
  const setShowDetails = usePokemonStore((state) => state.setShowDetails);
  const setIsCatching = usePokemonStore((state) => state.setIsCatching);
  const setShowMyPokemon = usePokemonStore((state) => state.setShowMyPokemon);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (Object.keys(pokemonDetail).length > 0) {
          const fetchSpesies = await fetch(pokemonDetail.species.url);
          const speciesData = await fetchSpesies.json();
          const fetchEvolution = await fetch(speciesData.evolution_chain.url);
          const evolutionData = await fetchEvolution.json();

          setSpecies(speciesData);
          setEvolution(evolutionData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [pokemonDetail]);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();

        setShowDetails(false);
        setIsCatching(false);
        setShowMyPokemon(false);
        loadPokemonDetail({});
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [setShowDetails, setIsCatching, loadPokemonDetail, setShowMyPokemon]);

  const closeHandler = () => {
    setShowDetails(false);
    setIsCatching(false);
    setShowMyPokemon(false);
    loadPokemonDetail({});
  };

  const buttonColor = (type: string) => {
    const color = {
      bgColor: 'bg-gray-100',
      textColor: 'text-base',
    };

    if (type == 'normal') {
      color.bgColor = 'bg-gray-200';
      color.textColor = 'text-black';
    }

    if (type == 'steel') {
      color.bgColor = 'bg-gray-400';
      color.textColor = 'text-black';
    }

    if (type == 'ice' || type == 'ghost') {
      color.bgColor = 'bg-gray-100';
      color.textColor = 'text-black';
    }

    if (type == 'rock') {
      color.bgColor = 'bg-[#767c6c]';
      color.textColor = 'text-black';
    }

    if (type == 'dragon') {
      color.bgColor = 'bg-red-500';
      color.textColor = 'text-black';
    }

    if (type == 'dark') {
      color.bgColor = 'bg-black';
      color.textColor = 'text-white';
    }

    if (type == 'grass') {
      color.bgColor = 'bg-green-500';
      color.textColor = 'text-green-950';
    }

    if (type == 'poison') {
      color.bgColor = 'bg-purple-500';
      color.textColor = 'text-purple-950';
    }

    if (type == 'fire') {
      color.bgColor = 'bg-orange-500';
      color.textColor = 'text-orange-950';
    }

    if (type == 'water') {
      color.bgColor = 'bg-cyan-500';
      color.textColor = 'text-cyan-950';
    }

    if (type == 'electric') {
      color.bgColor = 'bg-yellow-500';
      color.textColor = 'text-yellow-950';
    }

    if (type == 'electric') {
      color.bgColor = 'bg-yellow-500';
      color.textColor = 'text-yellow-950';
    }

    if (type == 'ground') {
      color.bgColor = 'bg-hot-cinnamon-500';
      color.textColor = 'text-hot-cinnamon-950';
    }

    if (type == 'bug') {
      color.bgColor = 'bg-black-bean-500';
      color.textColor = 'text-black-bean-950';
    }

    if (type == 'fighting') {
      color.bgColor = 'bg-red-500';
      color.textColor = 'text-red-950';
    }

    if (type == 'psychic') {
      color.bgColor = 'bg-indigo-500';
      color.textColor = 'text-indigo-950';
    }

    if (type == 'fairy') {
      color.bgColor = 'bg-pink-500';
      color.textColor = 'text-pink-950';
    }

    if (type == 'flying') {
      color.bgColor = 'bg-indigo-400';
      color.textColor = 'text-indigo-950';
    }

    return color;
  };

  let imageUrl = '';

  if (pokemonDetail.id < 899) {
    imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonDetail.id}.gif`;
  } else {
    imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonDetail.id}.png`;
  }

  return (
    <>
      {!isCatching && !showMyPokemon && (
        <div className="h-full w-full rounded-t-xl bg-white px-4">
          <div className="relative h-[130px] w-full">
            <button
              className="absolute right-0 top-0 z-10 mt-2 h-[45px] w-[45px] hover:cursor-pointer"
              onClick={() => closeHandler()}
            >
              <CloseSVG />
            </button>
            <div className="absolute -top-[50px] flex w-full justify-center">
              {Object.keys(pokemonDetail).length === 0 && (
                <img
                  src={pokeBallPict}
                  alt="pokeball"
                  className={`h-[200px] w-[200px] ${isLoading ? 'animate-spin' : ''}`}
                />
              )}
              {Object.keys(pokemonDetail).length > 0 && (
                <img src={imageUrl} alt={pokemonDetail.name} className={`h-[180px] w-[180px]`} />
              )}
            </div>
          </div>
          <div className="w-full">
            {!isLoading && Object.keys(pokemonDetail).length === 0 && (
              <p className="mt-14 w-full text-center text-[30px] font-bold text-slate-400">Select Pokemon</p>
            )}
            {isLoading && (
              <p className="mt-14 w-full animate-pulse text-center text-[30px] font-bold text-slate-400">Loading...</p>
            )}

            {Object.keys(pokemonDetail).length > 0 && (
              <>
                <div className="flex flex-col items-center leading-5">
                  <p className="text-[14px] font-medium text-slate-400">N&deg; {pokemonDetail.id}</p>
                  <p className="text-[18px] font-bold capitalize">{pokemonDetail.name}</p>

                  <div className="mt-3 flex gap-1">
                    {pokemonDetail.types.map((type: { type: { name: string } }) => (
                      <button
                        key={type.type.name}
                        className={`min-w-min rounded-lg px-3 py-1 text-[12px] font-semibold 
                  ${buttonColor(type.type.name).bgColor} 
                  ${buttonColor(type.type.name).textColor}`}
                      >
                        {type.type.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-center font-semibold">Pokedex Entry</p>
                  {species && (
                    <p className="mt-2 px-5 text-center text-[14px] font-medium text-gray-400">
                      {species.flavor_text_entries[2].flavor_text.replace('\n', ' ').replace('\f', ' ')}
                    </p>
                  )}
                </div>

                <div className="flex w-full justify-center">
                  <div className="mt-6 grid w-[500px] grid-cols-3 gap-3 px-2">
                    <div className="flex w-full flex-col items-center justify-center">
                      <p className="text-center font-semibold">Base Exp</p>
                      <div className="mt-2 flex w-full ">
                        <p className="flex h-[34px] w-full items-center justify-center rounded-xl bg-gray-100 text-[14px] font-medium">
                          {pokemonDetail.base_experience}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full flex-col items-center justify-center">
                      <p className="text-center font-semibold">Height</p>
                      <div className="mt-2 flex w-full ">
                        <p className="flex h-[34px] w-full items-center justify-center rounded-xl bg-gray-100 text-[14px] font-medium">
                          {(10 * pokemonDetail.height) / 100}m
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full flex-col items-center justify-center">
                      <p className="text-center font-semibold">Weight</p>
                      <div className="mt-2 flex w-full ">
                        <p className="flex h-[34px] w-full items-center justify-center rounded-xl bg-gray-100 text-[14px] font-medium">
                          {(10 * pokemonDetail.weight) / 100}kg
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 px-5">
                  <p className="w-full text-center font-semibold">Abilities</p>
                  <div className="mt-3 flex flex-wrap justify-center gap-3">
                    {pokemonDetail.abilities.map((item: any) => (
                      <div className="rounded-xl bg-gray-100 px-4" key={item.ability.name}>
                        <p className="flex h-[34px] items-center justify-center capitalize">
                          {item.ability.name.replace('-', ' ')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex flex-col items-center">
                  <p className="w-full text-center font-semibold">Stats</p>
                  <div className="mt-3 flex gap-4">
                    <div className="flex flex-col items-center rounded-full bg-gray-200 p-1">
                      <p className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-red-600 text-center text-[10px] font-bold text-white">
                        HP
                      </p>
                      <p className="mt-2 text-[12px] font-bold">{pokemonDetail.stats[0].base_stat}</p>
                    </div>
                    <div className="flex flex-col items-center rounded-full bg-gray-200 p-1">
                      <p className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-orange-400 text-center text-[10px] font-bold text-white">
                        ATK
                      </p>
                      <p className="mt-2 text-[12px] font-bold">{pokemonDetail.stats[1].base_stat}</p>
                    </div>
                    <div className="flex flex-col items-center rounded-full bg-gray-200 p-1">
                      <p className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-yellow-400 text-center text-[10px] font-bold text-white">
                        DEF
                      </p>
                      <p className="mt-2 text-[12px] font-bold">{pokemonDetail.stats[2].base_stat}</p>
                    </div>
                    <div className="flex flex-col items-center rounded-full bg-gray-200 p-1">
                      <p className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-cyan-500 text-center text-[10px] font-bold text-white">
                        SpA
                      </p>
                      <p className="mt-2 text-[12px] font-bold">{pokemonDetail.stats[3].base_stat}</p>
                    </div>
                    <div className="flex flex-col items-center rounded-full bg-gray-200 p-1">
                      <p className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-lime-500 text-center text-[10px] font-bold text-white">
                        SpD
                      </p>
                      <p className="mt-2 text-[12px] font-bold">{pokemonDetail.stats[4].base_stat}</p>
                    </div>
                    <div className="flex flex-col items-center rounded-full bg-gray-200 p-1">
                      <p className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-pink-300 text-center text-[10px] font-bold text-white">
                        SPD
                      </p>
                      <p className="mt-2 text-[12px] font-bold">{pokemonDetail.stats[5].base_stat}</p>
                    </div>
                    <div className="flex flex-col items-center rounded-full bg-indigo-300 p-1">
                      <p className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-indigo-500 text-center text-[10px] font-bold text-white">
                        TOT
                      </p>
                      <p className="mt-2 text-[12px] font-bold">
                        {pokemonDetail.stats.reduce((acc: any, obj: any) => {
                          return acc + obj.base_stat;
                        }, 0)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-7">
                  <p className="w-full text-center font-semibold">Evolution</p>
                  <div className="flex items-center justify-center gap-2">
                    {evolution !== undefined && (
                      <>
                        <div>
                          <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${evolution.chain.species.url
                              .slice(42)
                              .replace('/', '')}.png`}
                            alt={evolution.chain.species.name}
                          />
                          <p className="text-center font-semibold capitalize text-gray-500">
                            {evolution.chain.species.name}
                          </p>
                        </div>
                        {evolution.chain.evolves_to[0] !== undefined && (
                          <>
                            <p className="rounded-xl bg-gray-100 px-2 py-1 text-[14px] font-bold text-gray-500">
                              Lvl. {evolution.chain.evolves_to[0].evolution_details[0].min_level ?? '?'}
                            </p>
                            {/* <p>{evolution.chain.evolves_to[0].species.name}</p> */}
                            <div>
                              <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${evolution.chain.evolves_to[0].species.url
                                  .slice(42)
                                  .replace('/', '')}.png`}
                                alt={evolution.chain.evolves_to[0].species.name}
                              />
                              <p className="text-center font-semibold capitalize text-gray-500">
                                {evolution.chain.evolves_to[0].species.name}
                              </p>
                            </div>
                            {evolution.chain.evolves_to[0].evolves_to[0] !== undefined && (
                              <>
                                <p className="rounded-xl bg-gray-100 px-2 py-1 text-[14px] font-bold text-gray-500">
                                  Lvl.{' '}
                                  {evolution.chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level ?? '?'}
                                </p>
                                <div>
                                  <img
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution.chain.evolves_to[0].evolves_to[0].species.url
                                      .slice(42)
                                      .replace('/', '')}.png`}
                                    alt={evolution.chain.evolves_to[0].evolves_to[0].species.name}
                                  />
                                  <p className="text-center font-semibold capitalize text-gray-500">
                                    {evolution.chain.evolves_to[0].evolves_to[0].species.name}
                                  </p>
                                </div>
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {!isLoading && Object.keys(pokemonDetail).length > 0 && (
            <div className="flex justify-center">
              <button
                className="mt-4 rounded-full bg-red-300 p-2 hover:animate-spin"
                onClick={() => setIsCatching(true)}
              >
                <img src={pokeBallPict} alt="catch" className="h-[40px] w-[40px]" />
              </button>
            </div>
          )}
        </div>
      )}

      {isCatching && <CatchPokemon data={pokemonDetail} />}

      {!isCatching && showMyPokemon && <MyPokemonList />}
    </>
  );
};

export default PokemonDetails;
