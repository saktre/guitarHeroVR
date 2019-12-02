// variable to hold a reference to our A-Frame world
var world;
var stage;

var textHolder
var songIsPlaying = false;

var sphereGreen;
var sphereRed;
var sphereYellow;
var sphereBlue;
var edgeTV;

var currentTime;

var hits;

var timeBoard;

var greenPoint = [];
var redPoint = [];
var yellowPoint = [];
var bluePoint = [];


function setup() {
	// no canvas needed
	noCanvas();

	currentTime = millis();

	// construct the A-Frame world
	// this function requires a reference to the ID of the 'a-scene' tag in our HTML document
	world = new World('VRScene');

	// now that we have a world we can add elements to it using a series of wrapper classes
	// these classes are discussed in greater detail on the A-Frame P5 documentation site
	// https://cs.nyu.edu/courses/fall19/CSCI-UA.0380-001/aframep5.php

	// sphere primitive

	sphereGreen = new Sphere({
						x:0, y:0.9, z:1,
						radius: 0.05,
						red:0, green:255, blue:0
					});
	world.add(sphereGreen);

  sphereRed = new Sphere({
						x:0.1, y:0.9, z:1,
						radius: 0.05,
						red:255, green:0, blue:0
					});
	world.add(sphereRed);

  sphereYellow = new Sphere({
						x:0.2, y:0.9, z:1,
						radius: 0.05,
						red:255, green:255, blue:0
					});
	world.add(sphereYellow);

  sphereBlue = new Sphere({
						x:0.3, y:0.9, z:1,
						radius: 0.05,
						red:0, green:0, blue:255
					});
	world.add(sphereBlue);

	stage = new OBJ({
		asset: 'stage',
		mtl: 'stageMtl',
		x: 0,
		y: 2,
		z: 0,
		rotationY:270,
	});
	world.add(stage);

	// Add text holder
	// WIll add all the values we want to track to play the game, then use these to display new objects on screen

	textHolder = new Plane({
			x:0.3, y:1, z:2,
			width: 3,
			height: 0.3,
			opacity:0.4
		});

	world.add(textHolder)

}


function draw() {


// WHat do we need? Lets first
// 1) Get the current time of the video be diplayed in the VR world
if(songIsPlaying == true){
	updateText();

}

	// Gameplay controls

	if(keyIsPressed == true && key == "q") {
		greenPoint.push(Math.floor(millis() / 1000));
	}
	if(keyIsPressed == true && key == "w") {
		redPoint.push(Math.floor(millis() / 1000));
	}
	if(keyIsPressed == true && key == "e") {
		yellowPoint.push(Math.floor(millis() / 1000));
	}
	if(keyIsPressed == true && key == "r") {
		bluePoint.push(Math.floor(millis() / 1000));
	}
	if(keyIsPressed == true && key == "m") {
		alert("Green Notes" + greenPoint);
		alert("Red Notes" + redPoint);
		alert("Yellow Notes" + yellowPoint);
		alert("Blue Notes" + bluePoint);
	}
}




function keyPressed() {
		if(key == "q") {
			if(sphereGreen.green == 255 && sphereGreen.red == 0 && sphereGreen.blue == 0) {
				world.remove(sphereGreen);
			  sphereGreen = new Sphere({
								x:0, y:0.9, z:1,
								radius: 0.05,
								red:255, green:255, blue:255
							});
			  world.add(sphereGreen);
			}
			else {
				world.remove(sphereGreen);
			  sphereGreen = new Sphere({
								x:0, y:0.9, z:1,
								radius: 0.05,
								red:0, green:255, blue:0
							});
			  world.add(sphereGreen);
			}
		}

		if(key == "w") {
			if(sphereRed.green == 0 && sphereRed.red == 255 && sphereRed.blue == 0) {
				world.remove(sphereRed);
			  sphereRed = new Sphere({
								x:0.1, y:0.9, z:1,
								radius: 0.05,
								red:255, green:255, blue:255
							});
			  world.add(sphereRed);
			}
			else {
				world.remove(sphereRed);
				sphereRed = new Sphere({
									x:0.1, y:0.9, z:1,
									radius: 0.05,
									red:255, green:0, blue:0
								});
				world.add(sphereRed);
			}
		}
		if(key == "e") {
			if(sphereYellow.green == 255 && sphereYellow.red == 255 && sphereYellow.blue == 0) {
				world.remove(sphereYellow);
			  sphereYellow = new Sphere({
								x:0.2, y:0.9, z:1,
								radius: 0.05,
								red:255, green:255, blue:255
							});
			  world.add(sphereYellow);
			}
			else {
				world.remove(sphereYellow);
				sphereYellow = new Sphere({
									x:0.2, y:0.9, z:1,
									radius: 0.05,
									red:255, green:255, blue:0
								});
				world.add(sphereYellow);
			}
		}
		if(key == "r") {
			if(sphereBlue.green == 0 && sphereBlue.red == 0 && sphereBlue.blue == 255) {
				world.remove(sphereBlue);
			  sphereBlue = new Sphere({
								x:0.3, y:0.9, z:1,
								radius: 0.05,
								red:255, green:255, blue:255
							});
			  world.add(sphereBlue);
			}
			else {
				world.remove(sphereBlue);
				sphereBlue = new Sphere({
									x:0.3, y:0.9, z:1,
									radius: 0.05,
									red:0, green:0, blue:255
								});
				world.add(sphereBlue);
			}
		}
}

function mousePressed(){
	console.log("Clicked")
	// Why does this happen multiple times?

}
