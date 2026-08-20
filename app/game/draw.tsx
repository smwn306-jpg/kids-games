import { ArtworkScreen } from '../artwork';

export default function DrawGame() {
  const targets = [
    { id: 'back', rect: { x: 8, y: 12, w: 50, h: 52 }, path: '/categories' },
    { id: 'clear', rect: { x: 300, y: 450, w: 50, h: 50 } },
  ];

  return (
    <ArtworkScreen
      source={require('../../assets/draw-reference.png')}
      sourceW={360}
      sourceH={570}
      starBox={{ x: 280, y: 15, w: 65, h: 38 }}
      targets={targets}
    />
  );
}