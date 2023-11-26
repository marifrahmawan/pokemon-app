/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

interface IPokemon {
  id: number;
  name: string;
  url: string;
  types: [];
}

interface IPokemonState {
  pokemon: IPokemon[];
  pokemonDetail: any;
  isLoading: boolean;
  loadPokemon: (pokemonData: IPokemon) => void;
  loadPokemonDetail: (pokemonData: any) => void;
  setIsLoading: () => void;
}

const usePokemonStore = create<IPokemonState>()((set) => ({
  pokemon: [],
  pokemonDetail: {},
  isLoading: false,
  loadPokemon: (pokemonData) => set((state) => ({ pokemon: [...state.pokemon, pokemonData] })),
  loadPokemonDetail: (pokemonData) => set(() => ({ pokemonDetail: pokemonData })),
  setIsLoading: () => set((state) => ({ isLoading: !state.isLoading })),
}));

export default usePokemonStore;
