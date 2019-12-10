// variable to hold a reference to our A-Frame world
var world;
var stage;


var container;
var b;
var boxSong1, boxSong2;
var songData;


// Intital Game state to start the game
// 0: Game load page - Select song
// 1: Play song1 = "Slow Ride"
// 2: Song Stats - Total hits/misses (percentage)
var gameState = 0;
var startGameBox; //For Starting the game as of now
var planeBack //For empty screen at start

// Data files as JSON for holding the songMapping of timings for correct responses
var songData, songData1, songData2
var pathSong1 = "./../media/slowRide.mp4";
var pathSong2 = "./../media/bohemianRhapsody.mp4";

// For debugging and showing text
var textHolder
var songIsPlaying = false; //Variable to decide whether to use time difference between original and millis to make decisions on collisions

var sphereGreen;
var sphereRed;
var sphereYellow;
var sphereBlue;
var edgeTV;

var currentTime;
var offsetTime;

var hits = 0;

var timeBoard;

var greenPoint = [9,9,9,9,20,20,23,23,23,30,31,37,37,38,51,51,54,54,54,54,57,57,58,61,61,61,64,64,64,64,68,68,71,71,71,74,75,78,78,78,78,81,81,88,88,90,90,90,95,95,95,101,101,101,102,102,102,102,102,102,102,103,103,104,104,104,106,107,107,107,108,109,110,110,110,110,110,110,110,110,110,110,111,111,111,111,111,111,111,111,111,111,111,111,111,116,116,117,117,117,117,117,121,121,121,124,124,124,124,128,128,128,131,131,134,134,134,138,138,138,141,141,151,151,151,151,151,158,158,158,159,159,159,159,159,159,159,159,159,159,163,165,165,165,165,165,165,165,165,165,165,165,165,165,165,166,166,166,170,170,170,170,170,170,170,170,170,171,171,171,171,171,171,171,171,176,177,177,177,177,178,178,178,178,178,178,178,178,178,178,178,178,178,178,178,178,179,179,179,179,179,179,179,179,179,181,181,187,187,187,192,192,192,192,204,204,205,210,210,213,213,213,215,215,216,216,218,218,221,221,223,223,226,226,227,228,228,229,229,229,229,230,231,231,232,232,232,232,232,234,234,235,235,235,236,236,236,236,237,237,237,238,239,239,242,242,246,247,247,247,247,247,247,247,247,247,247,247,249,249,250,250,258,258,258,258,259,260,260,260,260,261,262,262,263,263,263,270,272,273,273,273,273,273,273,273,273,273,273,273,273,273,276,276,276,276,276,276,276,276,276,276,277,277,277,277,277,277,277,277,277,277,277,277,277,277,277,277,278,279,279,279,279,280,280,280,280,280,280,280,280,280,280,280,280,280,281,281,281,281,281,281,281,283,283,283,283,283,283,283,283,283,283,283,283,284,284,285,285,285,285,285,285,285,285,285,285,285,285,287,287,287,287,287,287,289,289,289,289,290,290,291,293,293,294,294,294,294,295,295,295,297,297,299,301,301,303,303,305,305,306,306,307,307,307,307,310,310,310,310,311,311,311,311,312,312,312,312,312,312,312,312,312,312,312,312,313,326,328,328,330,331,331,331,331,331,331,331,331,331,331,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,333,333,333,333,333,333,337,337,337,337,337,338,340,340,341,343,344,352,352,357,357,357,357,357];
var redPoint = [9,9,10,20,23,23,23,24,24,25,26,32,32,35,35,35,35,35,35,35,35,35,35,35,35,35,35,36,36,36,36,36,36,36,36,36,36,36,36,36,36,38,38,38,38,38,38,38,38,38,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,42,42,42,45,45,48,48,49,49,52,52,53,53,53,53,53,53,53,53,53,53,53,54,54,54,54,54,54,54,54,54,54,58,58,58,60,60,60,61,61,63,63,63,65,65,66,66,67,67,67,68,68,72,72,75,75,76,76,78,78,80,80,81,81,82,82,85,85,87,87,88,88,89,90,95,95,95,96,100,100,101,102,103,103,104,104,108,109,109,109,112,112,113,113,115,115,117,118,119,119,119,121,121,123,123,125,125,125,126,126,127,127,128,128,128,131,132,135,135,136,136,138,138,140,141,142,142,144,145,145,145,147,147,149,149,149,150,150,150,150,150,150,150,150,150,161,161,161,161,161,161,161,161,162,162,162,162,162,162,162,162,162,162,162,162,162,162,163,163,163,163,163,163,163,163,164,164,164,164,164,164,164,164,164,164,164,164,164,164,164,166,166,166,166,166,166,166,166,166,166,166,166,171,171,171,171,171,173,173,173,176,176,176,176,177,177,177,177,177,177,179,179,180,180,180,180,181,181,184,184,184,184,184,184,184,184,185,185,185,185,187,187,187,187,187,187,187,187,187,188,188,188,188,188,189,189,189,189,189,189,189,189,189,189,189,189,189,190,190,190,190,190,191,191,191,192,192,192,192,192,192,192,193,193,194,194,195,195,196,196,198,198,200,200,201,201,202,202,203,203,204,204,205,210,213,213,214,216,216,216,216,217,217,218,218,218,219,220,220,220,220,220,221,221,223,223,223,224,224,226,226,226,229,229,232,232,235,241,241,241,242,242,243,243,246,246,247,248,248,248,248,248,248,248,248,248,248,248,252,253,253,253,253,253,253,253,253,253,253,253,253,253,253,253,253,253,254,254,254,254,254,254,256,256,256,257,257,258,258,259,259,260,260,260,261,261,261,261,261,261,261,262,262,264,264,265,265,265,265,265,265,265,265,265,265,265,265,265,265,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,267,267,267,267,267,267,267,268,268,268,268,268,268,268,269,269,269,269,269,269,269,271,271,271,271,271,271,271,271,272,272,272,272,272,272,272,272,272,276,276,278,278,278,278,278,278,278,278,278,278,278,278,278,278,278,279,279,279,279,281,281,281,282,282,282,282,282,282,282,282,282,282,282,282,284,284,284,284,284,284,284,284,284,284,284,285,286,286,286,286,286,287,287,289,289,289,290,290,290,290,290,291,291,292,292,292,294,294,296,296,298,298,299,301,301,301,302,302,302,303,303,304,304,305,305,309,309,309,309,311,311,311,311,311,312,312,312,313,313,313,313,313,313,313,313,313,313,313,313,313,314,314,314,314,314,314,314,314,314,314,314,314,316,316,316,320,321,321,321,321,321,321,321,321,321,321,321,321,321,321,321,321,322,322,322,322,322,322,322,322,324,324,324,324,324,324,324,324,324,324,324,325,325,325,325,325,326,326,326,327,327,328,328,330,330,338,338,338,341,341,342,342,342,342,342,343,343,344,346,346,346,346,346,346,346,346,346,346,346,346,347,347,347,347,347,347,349,349,349,351,351,354,354,356,358,358,358,358,358,359,359,359,359,359,359,359,359,359,359,359,359,359,359,359,359,359,360,360,360,360,360,360,360,360,360,360,360,360,360,360,360,360,361,361,361,361,361,361,361,361,361,361,361,361,361,361,361,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,363,363,363,363,363,363,363,363,363,363,363,363,363,363,363,363,364,364,364,364,364,364,364,364,364,364];
var yellowPoint = [10,10,21,24,24,25,25,26,26,26,26,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,30,31,33,33,33,34,34,41,41,43,43,44,46,46,47,47,47,47,47,48,48,49,50,50,51,51,55,55,57,57,58,58,58,60,60,61,62,62,64,64,65,65,69,69,70,70,70,71,72,72,73,73,73,74,75,75,77,77,79,79,79,82,82,83,84,84,84,85,85,85,86,86,89,89,89,91,91,92,92,92,92,92,92,93,93,93,94,94,94,96,96,97,98,98,99,99,99,99,105,105,105,105,106,106,107,107,107,113,113,114,114,118,118,120,120,121,122,122,124,125,125,128,128,128,130,130,131,132,132,133,133,134,134,135,135,137,137,137,137,139,139,142,143,143,143,144,144,145,145,145,146,146,146,148,148,148,148,148,148,148,148,148,148,148,148,148,148,148,149,149,149,149,149,149,149,149,149,149,149,149,149,154,154,154,154,154,154,154,154,154,154,154,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,156,156,156,156,156,156,156,156,156,156,156,157,157,157,157,157,157,157,157,157,158,158,158,158,158,160,160,160,160,160,160,160,160,160,160,160,160,160,166,166,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,168,168,172,172,172,172,172,172,172,172,172,172,172,172,172,172,172,173,173,173,173,173,173,173,174,174,175,175,176,176,176,180,180,180,180,180,180,180,180,180,181,181,181,183,183,183,184,185,185,190,190,190,190,191,191,191,191,191,191,191,191,191,191,191,191,193,193,193,193,193,195,196,196,196,196,197,197,198,198,198,198,198,198,199,199,199,199,199,200,200,200,201,201,203,203,204,205,209,209,209,210,212,212,214,214,214,215,216,217,217,217,219,219,222,222,222,222,222,222,224,224,225,225,226,226,226,227,228,228,228,228,228,228,228,228,231,231,232,232,234,234,235,237,237,238,242,242,243,244,245,246,248,248,248,249,250,250,250,250,251,251,251,251,251,251,251,251,251,251,251,251,251,251,251,251,251,252,252,252,252,252,252,252,252,252,252,252,252,254,254,254,254,254,254,254,254,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,256,256,256,256,257,257,257,257,259,259,259,261,262,262,264,264,264,264,264,264,267,267,267,267,268,268,269,269,269,269,270,274,274,274,274,274,275,275,275,275,275,275,275,275,275,275,275,275,275,276,276,279,279,283,283,286,286,288,288,288,288,288,288,290,291,293,293,293,294,294,295,296,296,298,298,298,301,301,302,302,302,304,304,306,306,306,306,306,306,306,306,306,306,307,307,307,307,308,308,308,308,308,308,308,308,308,308,308,308,308,308,314,314,314,314,315,315,315,315,315,315,315,315,315,316,317,317,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,320,320,320,320,320,320,320,320,322,322,322,322,322,322,323,323,323,323,323,323,323,323,323,324,324,327,327,329,329,330,331,333,334,338,339,339,339,339,340,340,345,345,345,345,345,347,347,347,348,348,348,348,349,350,350,350,350,350,352,355,355,355];
var bluePoint = [10,10,10,22,22,25,25,25,30,30,32,32,40,40,40,43,43,44,47,47,55,55,55,55,55,55,56,56,56,56,56,56,56,56,56,56,56,56,56,56,56,56,56,57,57,57,57,57,57,59,59,59,62,62,66,66,69,69,72,72,76,76,76,79,79,79,83,83,86,86,86,87,89,89,89,96,96,99,99,113,113,115,115,118,122,122,125,125,129,129,132,132,132,136,136,139,139,142,145,145,146,146,146,151,151,151,151,151,151,151,152,152,152,152,152,152,152,152,152,152,152,152,152,153,153,153,153,153,153,153,153,153,153,153,153,153,153,157,157,157,157,157,168,168,168,168,168,168,168,168,169,169,169,169,169,169,169,169,169,169,169,169,169,169,169,169,169,169,170,170,174,174,174,174,174,174,174,175,175,175,175,175,175,175,175,181,181,182,182,182,182,182,182,182,182,182,182,182,182,182,182,182,182,183,183,183,183,183,183,183,183,185,185,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,186,187,187,188,188,188,188,188,188,188,188,188,188,188,188,189,189,195,195,196,197,197,199,199,200,200,201,201,202,202,202,202,209,209,212,212,212,214,214,214,219,219,219,222,222,222,223,224,224,225,225,225,243,243,246,246,263,263,270,270,270,270,270,271,271,273,273,274,274,274,274,274,292,292,292,293,293,293,293,295,295,297,297,297,298,300,300,302,302,304,304,309,309,309,309,310,310,310,310,310,310,310,310,310,310,315,315,315,315,315,315,315,316,316,316,316,316,316,316,317,317,317,317,317,317,317,317,317,317,317,317,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,320,320,320,324,324,327,327,329,329,339,339,339,340,340,340,342,342,342,343,343,345,348,348,348,349,349,350,353,353,353,353,353,353,353,353,353,353,353,353,353,353,354,355,355,356,356,356,357,357,357];

var pointBar;

var cheering;
var booing;

// Not being used
function preload() {

}


// Main setup codes to get the VR WORLD ready
function setup() {
	// no canvas needed
// Need to load the files in setup as per FAQs online
// https://github.com/processing/p5.js/wiki/Frequently-Asked-Questions#why-cant-i-assign-variables-using-p5-functions-and-variables-before-setup

	cheering = loadSound("static/cheering.mp3");
	booing = loadSound("static/booing.mp3");
	noCanvas();

	currentTime = millis();

	// cheering.setVolume(0.01);
	// booing.setVolume(0.01);

	// construct the A-Frame world
	// this function requires a reference to the ID of the 'a-scene' tag in our HTML document
	world = new World('VRScene');

// GENERATING THE crowd

	generateCrowd();

// Load song file
	songData1 = loadJSON("static/slowDownData.json")
	songData2 = loadJSON("static/slowDownData.json")
	// cubeFace.setAttribute("src",".././musicVR_Support/bohemianRhapsody.mp4")
	// cubeFace.setAttribute("src",".././musicVR_Support/slowRide.mp4")


// Keeping score

	pointBar = new Plane({
		x:-3, y:3, z:0,
		width: 0.1,
		height: 0.2,
		red: 0,
		green: 0,
		blue: 255,
	});
	world.add(pointBar);

	// sphere primitive for CLicking buttons and visualizing them

	sphereGreen = new Sphere({
						x:0.02, y:1.1, z:1,
						radius: 0.05,
						red:0, green:255, blue:0
					});
	world.add(sphereGreen);

  sphereRed = new Sphere({
						x:0.13, y:1.1, z:1,
						radius: 0.05,
						red:255, green:0, blue:0
					});
	world.add(sphereRed);

  sphereYellow = new Sphere({
						x:0.24, y:1.1, z:1,
						radius: 0.05,
						red:255, green:255, blue:0
					});
	world.add(sphereYellow);

  sphereBlue = new Sphere({
						x:0.35, y:1.1, z:1,
						radius: 0.05,
						red:0, green:0, blue:255
					});
	world.add(sphereBlue);

// Adding stage
	stage = new OBJ({
		asset: 'stage',
		mtl: 'stageMtl',
		x: 0,
		y: 2,
		z: 0,
		rotationY:270,
	});
	world.add(stage);


// Container to hold start screen, first song, second song



	// A container has a center point and rotation
	container = new Container3D({
	  x:0, y:1.2, z:1.4
	})
	world.add(container);

	b = new Text({
	  x:0, y:0, z:0.2
	  // red:0, green:0, blue:30

	})

	// container.addChild(b)


// Used for lighting
	boxSong1 = new Box({
	  x:0, y:0, z:1,
	  red:0, green:0, blue:0,
	  width:4, height:4, depth:4,
		opacity:0.2,
		side: 'double',
		clickFunction: function(theOBJ) {
	  	console.log("Song 1");
	  }

	})

	container.addChild(boxSong1)
// $$$$$ SONG BOXES
	// Select Song you want to choose
	startSlowRide = new Box({
						x:-1, y:0, z:0,
						width:1,
						opacity:0.4,
						red:0, green:200,blue:0,
						clickFunction: function(theBox) {
							theBox.setColor( random(255), random(255), random(255) );
							gameState = 1;
						}
	});

	startBohemian = new Box({
						x:1, y:0, z:0,
						width:1,
						opacity:0.4,
						red:200, green:0,blue:0,
						onHover:function(theBox){
							console.log("Bohemian");
						},
						clickFunction: function(theBox) {
							theBox.setColor( random(255), random(255), random(255) );
							gameState = 3;
						}
	});

	// add a plane to hide the crowd and show text

	planeBack = new Plane({
		x:0, y:0, z:0,
		red:0,green:0,blue:0,
		width:5, height:10
	})

	container.addChild(planeBack);
	// add the box to the world
	// world.add(startGameBox);
container.addChild(startSlowRide);
container.addChild(startBohemian);

// Start Game box
startGameBox = new Box({
					x:-1,
					y:0,
					z:0,
					width:1,
					opacity:0.4,
					clickFunction: function(theBox) {
						theBox.setColor( random(255), random(255), random(255) );

						gameState = 1;

					}
});




	world.camera.setPosition(0,1.2,3);
	world.camera.holder.setAttribute('wasd-controls',"enabled:false;")

}

// Playing the selected song at 0.1 ms level of precision

// ASCII Keys for the ones we need to use
//
// var greenKey = 70;
// var redKey = 71;
// var yellowKey = 32;
// var blueKey = 77;

var greenKey = 87;
var redKey = 65;
var yellowKey = 83;
var blueKey = 68;


function playGame(){

	currentTime = millis()
	// Assuming the values are relatively in time at second level
	checkTime = (currentTime - offsetTime)/1000.0
	checkTime = checkTime.toFixed(1)
	// console.log(checkTime);
	// Reset sphere colors
	sphereGreen.setColor(0,255,0);
	sphereRed.setColor(255,0,0);
	sphereYellow.setColor(255,255,0);
	sphereBlue.setColor(0,0,255);


	if (keyIsDown(greenKey) ){

// User pressed green key, but is it right?
		if (songData.green.includes(checkTime)){
			// console.log(checkTime);
			// greenPts.push(checkTime);
			boxSong1.setColor(0,random(180,255),0)
			hits += 1;
			pointBar.setWidth(pointBar.getWidth() + 0.01);
			sphereGreen.setColor(0,255,0);
		} else {
			hits-= 1;
			pointBar.setWidth(pointBar.getWidth() - 0.003);
			boxSong1.setColor(0,0,0)
			sphereGreen.setColor(0,0,0);
		}

}


	if (keyIsDown(redKey)){

		if (songData.red.includes(checkTime)){
			// console.log(checkTime);
			// greenPts.push(checkTime);
			boxSong1.setColor(255,0,0)
			hits += 1;
			pointBar.setWidth(pointBar.getWidth() + 0.01);
			sphereRed.setColor(255,0,0)
		} else {
			hits-= 1;
			pointBar.setWidth(pointBar.getWidth() - 0.003);
			boxSong1.setColor(0,0,0)
			sphereRed.setColor(0,0,0)
		}
	}

	if (keyIsDown(yellowKey)){

		if (songData.yellow.includes(checkTime)){
			// console.log(checkTime);
			// greenPts.push(checkTime);
			boxSong1.setColor(255,255,0)
			hits += 1;
			pointBar.setWidth(pointBar.getWidth() + 0.01);
			sphereYellow.setColor(255,255,0)

		} else {
			hits-= 1;
			pointBar.setWidth(pointBar.getWidth() - 0.003);
			boxSong1.setColor(0,0,0)
			sphereYellow.setColor(0,0,0)
		}

	}

	if (keyIsDown(blueKey)){

		if (songData.blue.includes(checkTime)){
			// console.log(checkTime);
			// greenPts.push(checkTime);
			boxSong1.setColor(0,0,255)
			hits += 1;
			pointBar.setWidth(pointBar.getWidth() + 0.01);
			sphereBlue.setColor(0,0,255)
		} else {
			hits-= 1;
			pointBar.setWidth(pointBar.getWidth() - 0.003);
			boxSong1.setColor(0,0,0)
			sphereBlue.setColor(0,0,0)
		}

  }


		if(hits > 15) {
			for(let happyCrowd = 0; happyCrowd < crowdAction.length; happyCrowd++) {
				crowdAction[happyCrowd].move();
			}
			//cheering.play();
		}

		if(hits < 40 && Math.floor(millis() / 1000) == Math.floor(cubeFace.duration / 2)) {
			//booing.play();
		}


	// boxSong1.setColor(255,255,255)


}


// Key codes: need to disable camera and use arrow keyIsDown
// v 118 b 98 n 110 m 109
function draw() {

// console.log(keyCode);

	if (gameState == 0) {
		// console.log("Ready to start Game")
		sphereGreen.hide()
		sphereRed.hide()
		sphereYellow.hide()
		sphereBlue.hide()
		document.getElementById('videoEntity').setAttribute('visible', false);

	}

	if (gameState ==1){

		sphereGreen.show()
		sphereRed.show()
		sphereYellow.show()
		sphereBlue.show()
		document.getElementById('videoEntity').setAttribute('visible', true);

		container.removeChild(startSlowRide);
		container.removeChild(startBohemian);
		container.removeChild(planeBack);

		// Correct position of Spheres for this song1
		sphereRed.setX(0.039)
		sphereGreen.setX(-0.1049)
		sphereYellow.setX(0.19)
		sphereBlue.setX(0.329)

		cubeFace.setAttribute("src",pathSong1)
		songData = songData1;
		// document.querySelector("#mainTextBox").remove()
		cubeFace.play();
		offsetTime = millis() - 4000
		gameState =2

	// Main game codes
	}

// For bohemianRhapsody
	if (gameState == 3){

		sphereGreen.show()
		sphereRed.show()
		sphereYellow.show()
		sphereBlue.show()
		document.getElementById('videoEntity').setAttribute('visible', true);

		container.removeChild(startSlowRide);
		container.removeChild(startBohemian);
		container.removeChild(planeBack);

		cubeFace.setAttribute("src",pathSong2)
		songData = songData1;
		// document.querySelector("#mainTextBox").remove()
		cubeFace.play();
		offsetTime = millis() - 4000
		gameState =2


	}

	if(gameState ==2){
		// PlayGame1();
		playGame();

	}
}
// Using mouse press to do what? Maybe point at squres to choose difficulty and song and then play
function mousePressed(){
	// console.log("Clicked")
	// Why does this happen multiple times?

}
