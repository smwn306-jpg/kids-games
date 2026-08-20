import { ArtworkScreen } from '../artwork';

export default function MemoryGame() {
  const targets = [
    { id: 'back', rect: { x: 8, y: 12, w: 50, h: 52 }, path: '/categories' },
  ];

  return (
    <ArtworkScreen
      source={require('../../assets/memory-reference.png')}
      sourceW={360}
      sourceH={570}
      starBox={{ x: 280, y: 15, w: 65, h: 38 }}
      targets={targets}
    />
  );
}