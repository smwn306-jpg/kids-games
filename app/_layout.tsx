import { Stack } from 'expo-router';
import { createContext, useContext, useMemo, useState } from 'react';

export type AppProgress = {
  stars: number;
  gamesPlayed: number;
};

type AppProgressContextValue = AppProgress & {
  addStars: (amount: number) => void;
  gameCompleted: () => void;
  resetProgress: () => void;
};

const AppProgressContext = createContext<AppProgressContextValue | null>(null);

export function useAppProgress() {
  const value = useContext(AppProgressContext);
  if (!value) throw new Error('useAppProgress must be used inside AppProgressProvider');
  return value;
}

export default function Layout() {
  const [stars, setStars] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);

  const value = useMemo(() => ({
    stars,
    gamesPlayed,
    addStars: (amount: number) => setStars((current) => current + amount),
    gameCompleted: () => setGamesPlayed((current) => current + 1),
    resetProgress: () => {
      setStars(0);
      setGamesPlayed(0);
    },
  }), [stars, gamesPlayed]);

  return (
    <AppProgressContext.Provider value={value}>
      <Stack screenOptions={{ headerShown: false }} />
    </AppProgressContext.Provider>
  );
}
