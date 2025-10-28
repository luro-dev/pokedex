import { useEffect, useState } from "react";
import { getPokedexNumber, getFullPokedexNumber } from "../utils/index";

export function PokeCard(props) {
  const { selectedPokemon } = props;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // if loading, exit logic
    if (loading || !localStorage) {
      return;
    }
    // check if selected pokemon is available in cache
    // 1. define the cache
    let cache = {};
    if (localStorage.getItem("pokedex")) {
      cache = JSON.parse(localStorage.getItem("pokedex"));
    }
    // 2. check if in cache, else fetch

    if (selectedPokemon in cache) {
      // read from cache
      setData(cache[selectedPokemon]);
      return;
    }
    // 3. if we fetch make sure to save information for next time

    async function fetchPokemonData() {
      setLoading(true);
      try {
        const baseUrl = "https://pokeapi.co/api/v2/";
        const suffix = `pokemon/${getPokedexNumber(selectedPokemon)}`;
        const finalUrl = baseUrl + suffix;
        const res = await fetch(finalUrl);

        const pokemonData = await res.json();
        setData(pokemonData);
        console.log(pokemonData);

        cache[selectedPokemon] = pokemonData;
        localStorage.setItem("pokedex", JSON.stringify(cache));
      } catch {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPokemonData();
  }, [selectedPokemon]);
  return (
    <div className="poke-card">
      <div>
        <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
      </div>
    </div>
  );
}
