export type ChildProfile = {
  id: string;
  name: string;
  avatar: string;
  color: string;
  stars: number;
  gamesPlayed: number;
  createdAt: number;
  completed?: string[];
  completedLevels?: Record<string, number[]>;
};
