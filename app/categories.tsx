import { ArtworkScreen } from './artwork';
export default function Categories(){const targets=[
['back',7,12,50,52,'/'],['animals',20,72,100,94,'/levels'],['numbers',126,72,100,94,'/game/numbers'],['letters',232,72,100,94,'/game/letters'],
['colors',20,172,100,94,'/game/colors'],['puzzles',126,172,100,94,'/game/puzzles'],['memory',232,172,100,94,'/game/memory'],
['math',20,272,100,94,'/game/math'],['draw',126,272,100,94,'/game/draw'],['differences',232,272,100,94,'/game/differences'],
['mazes',20,372,100,94,'/game/mazes'],['music',126,372,100,94,'/game/music'],['sorting',232,372,100,94,'/game/sorting'],['adventure',20,475,310,76,'/adventure']];
return <ArtworkScreen source={require('../assets/categories-reference.png')} sourceW={350} sourceH={570} starBox={{x:265,y:15,w:68,h:38}} targets={targets.map(([id,x,y,w,h,path])=>({id:String(id),rect:{x:+x,y:+y,w:+w,h:+h},path:String(path)}))}/>}
