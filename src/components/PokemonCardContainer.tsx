import { useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';
import usePokemonStore from '../store/pokemon-store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Response<T = any> = {
  count: number;
  next: string;
  previous?: string | null;
  results: T;
};

interface IPokemon {
  id: number;
  name: string;
  url: string;
  types: [];
}

const PokemonCardContainer = () => {
  const pokemon = usePokemonStore((state) => state.pokemon);
  const loadPokemon = usePokemonStore((state) => state.loadPokemon);

  const [baseUrl, setBaseUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=44&offset=0');
  const [response, setResponse] = useState<Response>();

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const result = await fetch(baseUrl);

        const resultData = await result.json();

        setResponse(resultData);

        resultData?.results.map(async (item: IPokemon) => {
          try {
            const result = await fetch(item.url);
            const pokemonData = await result.json();

            loadPokemon(pokemonData);
          } catch (error) {
            console.log(error);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    getPokemon();
  }, [baseUrl, loadPokemon]);

  window.onscroll = function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - document.body.offsetHeight * 0.05) {
      setBaseUrl(response!.next);
    }
  };

  return (
    <div className="mx-9 grid min-h-[2000px] grow grid-cols-2 gap-4 p-5 lg:grid-cols-4 lg:p-0">
      {pokemon
        .sort((a, b) => a.id - b.id)
        .map((pokemon: IPokemon) => (
          <PokemonCard key={pokemon.id} id={pokemon.id} name={pokemon.name} types={pokemon.types} data={pokemon} myPokemonName={undefined} />
        ))}
    </div>
  );
};

export default PokemonCardContainer;
