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
  showDetails: boolean;
  isCatching: boolean;
  showMyPokemon: boolean;

  setIsCatching: (input: boolean) => void;
  loadPokemon: (pokemonData: IPokemon) => void;
  loadPokemonDetail: (pokemonData: any) => void;
  setIsLoading: () => void;
  setShowDetails: (input: boolean) => void;
  setShowMyPokemon: (input: boolean) => void;
}

const usePokemonStore = create<IPokemonState>()((set) => ({
  pokemon: [],
  pokemonDetail: {},
  isLoading: false,
  showDetails: false,
  isCatching: false,
  showMyPokemon: false,

  loadPokemon: (pokemonData) => set((state) => ({ pokemon: [...state.pokemon, pokemonData] })),
  loadPokemonDetail: (pokemonData) => set(() => ({ pokemonDetail: pokemonData })),
  setIsLoading: () => set((state) => ({ isLoading: !state.isLoading })),
  setShowDetails: (input: boolean) => set(() => ({ showDetails: input })),
  setIsCatching: (input: boolean) => set(() => ({ isCatching: input })),
  setShowMyPokemon: (input: boolean) => set(() => ({ showMyPokemon: input })),
}));

export default usePokemonStore;
