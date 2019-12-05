// Adding visuals to the stadium like flying cubes

class CubeDraw {
  constructor(x,y,z,id){
    this.x = x,
    this.y = y,
    this.z = z,
    this.identity = id,
    this.cube = new Box({
    						x:this.x, y:this.y, z:this.z,
    						width:0.3, height: 0.3, depth: 0.3,
    						red:random(255), green:random(255), blue:random(255)
    					});
  }

}

var boxCollection = []

function addBoxToWorld(x,y,z,id){

  var temp = new CubeDraw(x,y,z,id);
  world.add(temp.cube);

}


function boxCollage(){

  for(let i=0;i<30;i++){
    x = i - 5;
    y = 1;
    z = 1;
    addBoxToWorld(x,y,z,"id"+i)
  }


}
