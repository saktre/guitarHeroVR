// Codes to have the audience in the VR Stadium and interact with the performance

var audienceMember;

var xPos = -2;
var yPos = 1.72;
var zPos = -1;
var cubeFace;
var cheering;
var booing;

var crowdAction = [];

document.addEventListener("DOMContentLoaded",function() {
  cubeFace = document.querySelector("#guitarHero");
});

// Can be made modular, maybe just generate this into a csv or JSON and load it and draw the people.
// Seems to be slow, better to be able to call it as a function so that we can comment line that calls it when testing it in draw

function generateCrowd(){
  for(let crowd = 0; crowd < 7; crowd++) {
		if(crowd == 1) {
			xPos = -2;
			yPos = 1.53;
			zPos = -0.6;
		}
		if(crowd == 2) {
			xPos = -2;
			yPos = 1.34;
			zPos = -0.2;
		}
		if(crowd == 3) {
			xPos = -2;
			yPos = 1.15;
			zPos = 0.2;
		}
		if(crowd == 4) {
			xPos = -2;
			yPos = 0.96;
			zPos = 0.4;
		}
		if(crowd == 5) {
			xPos = -1.9;
			yPos = 0.77;
			zPos = 0.8;
		}
		if(crowd == 6) {
			xPos = -1.8;
			yPos = 0.58;
			zPos = 1.2;
		}
		for(let chair = 0; chair < 13; chair++) {
      if(Math.floor(random(0,5)) == 2 && crowdAction.length < 18) {
        audienceMember = new Watcher(xPos,yPos,zPos);
  			crowdAction.push(audienceMember);
      }
			//world.add(audienceMember);
			if(chair == 2) {
				xPos += 0.4;
			}
			if(chair == 6) {
				xPos += 0.9;
			}
			if(chair == 9) {
				xPos += 0.6;
			}
			else {
				xPos += 0.2;
			}
		}
	}

}

// This is the audience watcher class, the class that generates copies of the audience in the world
class Watcher {
	constructor(x,y,z) {
		this.appearence = new OBJ({
			asset: 'audienceMember',
			mtl: 'audienceMemberMtl',
			x: x,
			y: y,
			z: z,
			scaleX: 0.1,
			scaleY: 0.1,
			scaleZ: 0.1,
			rotationY: 230,
		});
	  world.add(this.appearence);
		this.noiseY = random(y-0.2,y+0.2);
	}
	move() {
		var moveY = map( noise(this.noiseY), 0, 1, -0.003, 0.003 );
		//alert(moveY);
		//this.appearence.nudge(this.appearence.x, moveY, this.appearence.z);
		this.appearence.y += moveY;
		this.appearence.constrainPosition(this.appearence.x, this.appearence.x, this.appearence.y, this.appearence.y, this.appearence.z , this.appearence.z);
		//this.appearence.constrainPosition(1.52, 2, 0, 2, 1.52, 2);
		this.noiseY += 0.01;
	}
}
