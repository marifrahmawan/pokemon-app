import usePokemonStore from '../store/pokemon-store';

const PokemonCard = ({ id, name, types, data }: { id: number; name: string; types: []; data: unknown }) => {
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

    if (type == 'ice' || type == 'ghost' ) {
      color.bgColor = 'bg-gray-100';
      color.textColor = 'text-black';
    }

    if (type == 'rock' ) {
      color.bgColor = 'bg-[#767c6c]';
      color.textColor = 'text-black';
    }

    if (type == 'dragon' ) {
      color.bgColor = 'bg-red-500';
      color.textColor = 'text-black';
    }

    if (type == 'dark' ) {
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
  if (id < 899) {
    imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${id}.png`;
  } else {
    imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }
  const loadPokemonDetail = usePokemonStore((state) => state.loadPokemonDetail);
  const setIsloading = usePokemonStore((state) => state.setIsLoading);

  const detailHandler = () => {
    setIsloading();
    loadPokemonDetail({});
    setTimeout(() => {
      loadPokemonDetail(data);
      setIsloading();
    }, 500);
  };

  return (
    <div
      className="lg:my-10 my-4 h-[170px] w-full rounded-3xl bg-white p-3 shadow-2xl hover:cursor-pointer"
      onClick={() => detailHandler()}
    >
      <div className="relative flex h-[50px] justify-center">
        <span className="absolute top-[-50px] h-[100px] w-[100px]">
          <img src={imageUrl} alt={name} className="h-full w-full" />
        </span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h3 className="mb-1 font-bold text-gray-500">N&deg; {id}</h3>
        <h2 className="mb-2 font-extrabold capitalize text-black">{name}</h2>
        <div className="flex gap-1">
          {types.map((type: { type: { name: string } }) => (
            <div className="flex gap-2" key={type.type.name}>
              <button
                key={type.type.name}
                className={`min-w-min rounded-lg px-3 py-1 text-[12px] font-semibold 
              ${buttonColor(type.type.name).bgColor} 
              ${buttonColor(type.type.name).textColor}`}
              >
                {type.type.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
