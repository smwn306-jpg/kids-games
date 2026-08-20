import { useLocalSearchParams } from 'expo-router';
import AnimalsGame from '../animals';
import ColorsGame from '../colors';
import DifferencesGame from '../differences';
import DrawGame from '../draw';
import LettersGame from '../letters';
import MathGame from '../math';
import MazesGame from '../mazes';
import MemoryGame from '../memory';
import MusicGame from '../music';
import NumbersGame from '../numbers';
import PuzzlesGame from '../puzzles';
import SortingGame from '../sorting';

export default function GameRouter() {
  const { id } = useLocalSearchParams<{ id: string }>();

  switch (id) {
    case 'animals': return <AnimalsGame />;
    case 'colors': return <ColorsGame />;
    case 'differences': return <DifferencesGame />;
    case 'draw': return <DrawGame />;
    case 'letters': return <LettersGame />;
    case 'math': return <MathGame />;
    case 'mazes': return <MazesGame />;
    case 'memory': return <MemoryGame />;
    case 'music': return <MusicGame />;
    case 'numbers': return <NumbersGame />;
    case 'puzzles': return <PuzzlesGame />;
    case 'sorting': return <SortingGame />;
    default: return <AnimalsGame />;
  }
}