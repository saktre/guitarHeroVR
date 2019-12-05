// Global variable to hold the video on the Frame
var mainSong;

// window.addEventListener('load', (event) => {
  // console.log('page is fully loaded');

  // mainSong = document.getElementById('guitarHero')

// });


function StartSong(){
  // mainSong.load();
  offsetTime = millis();
  document.querySelector("#song1-vid").play()
  document.querySelector("#mainTextBox").remove()

  // document.querySelector('[camera]').removeAttribute('wasd-controls');

}


// function getCurrentPlaybackTime(){
  // return mainSong.currentTime;
// }


// function updateText(){
  // var currentTimeSong = getCurrentPlaybackTime();
  // textHolder.tag.setAttribute('text',
		    // 'value: timeNow:'+int(millis()/1000) +' VidTime:' + round(currentTimeSong,2) + '; color: rgb(0,0,0); align: center;');
        // console.log("AS");

  // }
