// Global variable to hold the video on the Frame
var mainSong;

window.addEventListener('load', (event) => {
  console.log('page is fully loaded');

  mainSong = document.getElementById('song1-vid')

});


function StartSong(){
  mainSong.load();
  currentTime = millis();
  songIsPlaying =true;
  // document.querySelector('[camera]').removeAttribute('wasd-controls');

}


function getCurrentPlaybackTime(){
  return mainSong.currentTime;
}


function updateText(){
  var currentTimeSong = getCurrentPlaybackTime();
  textHolder.tag.setAttribute('text',
		    'value: timeNow:'+int(millis()/1000) +' VidTime:' + round(currentTimeSong,2) + '; color: rgb(0,0,0); align: center;');

  }
