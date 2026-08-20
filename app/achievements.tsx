import { ArtworkScreen } from './artwork';

export default function Achievements() {
  return (
    <ArtworkScreen
      source={require('../assets/achievements-reference.png')}
      sourceW={260}
      sourceH={454}
      targets={[
        { id: 'back', rect: { x: 5, y: 10, w: 45, h: 50 }, path: '/' },
        { id: 'tab1', rect: { x: 15, y: 55, w: 75, h: 40 }, path: '/achievements' },
        { id: 'tab2', rect: { x: 92, y: 55, w: 75, h: 40 }, path: '/achievements' },
        { id: 'tab3', rect: { x: 170, y: 55, w: 75, h: 40 }, path: '/achievements' },
        { id: 'home', rect: { x: 5, y: 415, w: 55, h: 35 }, path: '/' },
        { id: 'rewards', rect: { x: 65, y: 415, w: 55, h: 35 }, path: '/rewards' },
        { id: 'report', rect: { x: 115, y: 415, w: 55, h: 35 }, path: '/report' },
        { id: 'parent', rect: { x: 170, y: 415, w: 60, h: 35 }, path: '/parent' },
      ]}
    />
  );
}