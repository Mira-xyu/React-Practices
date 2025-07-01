import useFetch from "./useFetch";

type Pokemon = {
  name: string;
};

const PokemonList = () => {
  const { data, loading, error } = useFetch<{ results: Pokemon[] }>(
    `https://pokeapi.co/api/v2/pokemon?${new URLSearchParams({
      limit: "10",
      offset: "0",
    })}`
  );
  const pokemons = data?.results || [];

  if (loading) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <ol>
      {pokemons.map((pokemon) => (
        <li key={pokemon.name}>{pokemon.name}</li>
      ))}
    </ol>
  );
};

export default PokemonList;
