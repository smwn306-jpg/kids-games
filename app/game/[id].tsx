import { Redirect, useLocalSearchParams } from 'expo-router';

const routes: Record<string, string> = {
  animals: '/game/animals', 
  numbers: '/game/numbers', 
  letters: '/game/letters',
  colors: '/game/colors', 
  puzzles: '/game/puzzles', 
  memory: '/game/memory',
  math: '/game/math', 
  draw: '/game/draw', 
  differences: '/game/differences',
  mazes: '/game/mazes', 
  music: '/game/music', 
  sorting: '/game/sorting',
};

export default function GameRouter() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  return <Redirect href={(routes[String(id)] ?? '/categories') as any} />;
}