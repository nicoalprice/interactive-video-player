// Variables
var vid, playBtn, seekBar, currentTime;


// Initialize video player
function initializeVideo() {
    // Set object references
    vid = document.getElementById("my-video");
    playBtn = document.getElementById("play-pause-btn");
    seekBar = document.getElementById("seek-slider");
    currentTime = document.getElementById("current-time");

    // Set event listeners
    playBtn.addEventListener("click", playPause, false);
    seekBar.addEventListener("change", vidSeek, false);
    vid.addEventListener("timeupdate", seekTimeUpdate, false);

    // Start seek marker at 0 before video plays

}

window.onload = initializeVideo;

// Implement the play and pause buttons.

// Switch between play and pause.
function playPause() {
    if (vid.paused == true) {
        vid.play();
        playBtn.innerHTML = "<img src='icons/pause-icon.png' alt='pause'>";
    }
    else {
        vid.pause();
        playBtn.innerHTML = "<img src='icons/play-icon.png' alt='play'>";
    }
}

// Add volume button that lets you mute the sound or turn it on.

/* function volumeControl {

}
*/

// Implement the fullscreen button.

/*

function fullScreen() {

}

*/

/* Implement the playback progress control. */

function vidSeek() {
    /* A user should be able to click anywhere on the playback bar to jump to that part of the video. */
    var seek = vid.duration * (seekBar.value / 100);
    vid.currentTime = seek;
}

/* As the video plays the playback bar should fill in. */

function seekTimeUpdate() {
    var newTime = vid.currentTime * (100 / vid.duration);
    seekBar.value = newTime;

/* As the video plays the current time should be displayed and updated e.g. 0:10 / 11:34. */
    var currentMinutes = Math.floor(vid.currentTime / 60);
    var currentSeconds = Math.floor(vid.currentTime - currentMinutes * 60);

    if (currentSeconds < 10) {
        currentSeconds = "0"+currentSeconds;
    }

    currentTime.innerHTML = currentMinutes + ":" + currentSeconds;
}

/* Use Javascript or CSS to hide and show the video player button on mouse hover states.
Only the progress bar should remain. */

/* As the media playback time changes, sentences in the transcript should highlight.
Use JavaScript to listen for those changes and apply a highlight to the appropriate sentence.
You can use the captions.vtt file to see the times at which the words are spoken in the video. */


// EXCEEDS EXPECTATIONS //

// Embed the .vtt file as a closed captioning track and add a button to video controls to toggle captions on and off.

// A creative and thoughtful responsive design.

// Playback speed control or other helpful controls.

// Volume control so viewer can adjust the volume level, not just mute or on.

// Playback controls include buffering progress of the downloaded video.

// When the user clicks on any sentence in the transcript the video player jumps to the appropriate time in the video.
