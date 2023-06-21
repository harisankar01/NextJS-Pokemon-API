import { Pokemon, Result } from '@/utils/interfaces';
import Main from './main';

async function getData() {
  
  try{
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150', {
      method: "GET"
    });
    const data: Result = await res.json();
    
    const pokemon: Pokemon[] = data.results.map((poke: Pokemon, index: number) => {
      const paddedId = ('00' + (index + 1)).slice(-3);
      const img = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
      return { ...poke, img };
    });
    return pokemon; 
    }
    catch (error) {
      throw new Error('Failed to fetch data')
  }
}

export default async function Page() {
  const pokemon: Pokemon[]= await getData();

  return <Main pokemon={pokemon} />
}
