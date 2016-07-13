// Variables
var vid, playButton, seekBar, curTime, muteButton, volumeBar, fullScreen, captionButton;


// Initialize video player
function initializeVideo() {
    // Set object references
    vid = document.getElementById("my-video");
    playButton = document.getElementById("play-pause-btn");
    seekBar = document.getElementById("seek-slider");
    curTime = document.getElementById("current-time");
    muteButton = document.getElementById("mute");
    captionButton = document.getElementById("caption-button");
    volumeBar = document.getElementById("volume-bar");
    fullScreen = document.getElementById("full-screen");

    // Set event listeners
    playButton.addEventListener("click", playPause, false);
    seekBar.addEventListener("change", vidSeek, false);
    vid.addEventListener("timeupdate", seekTimeUpdate, false);
    captionButton.addEventListener("click", closedCaptions, false);
    volumeBar.addEventListener("change", volumeControl, false);
    muteButton.addEventListener("click", mute, false);
    fullScreen.addEventListener("click", screenSize, false);
}

window.onload = initializeVideo;

// Implement the play and pause buttons.
// Switch between play and pause.
function playPause() {
    if (vid.paused == true) {
        vid.play();
        playButton.innerHTML = "<img src='icons/pause-icon.png' alt='pause'>";
    }
    else {
        vid.pause();
        playButton.innerHTML = "<img src='icons/play-icon.png' alt='play'>";
    }
}

// Add volume button that lets you mute the sound or turn it on.

function volumeControl() {
    vid.volume = volumeBar.value;
}

function mute() {
    if (vid.muted == false) {
        // Mute the video
        vid.muted = true;
        // Update the button text
        muteButton.innerHTML = "<img src='icons/volume-on-icon.png'>";
        // Update volume bar
          volumeBar.value = 0;
    } else {
        // Unmute the video
        vid.muted = false;
        // Update the button text
        muteButton.innerHTML = "<img src='icons/volume-off-icon.png'>";
        //Set video bar back to previous value
        volumeBar.value = vid.volume;
  }
}

// Implement the fullscreen button.

function screenSize() {
    if (vid.requestFullscreen) {
    vid.requestFullscreen();
    } else if (vid.mozRequestFullScreen) {
    vid.mozRequestFullScreen(); // Firefox
    } else if (vid.webkitRequestFullscreen) {
    vid.webkitRequestFullscreen(); // Chrome and Safari
    }
}

/* Implement the playback progress control. */

function vidSeek() {
    /* A user should be able to click anywhere on the playback bar to jump to that part of the video. */
    var seek = vid.duration * (seekBar.value / 100);
    vid.curTime = seek;
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

    curTime.innerHTML = currentMinutes + ":" + currentSeconds;
}

/* Use Javascript or CSS to hide and show the video player button on mouse hover states. Only the progress bar should remain. */

/* As the media playback time changes, sentences in the transcript should highlight.
Use JavaScript to listen for those changes and apply a highlight to the appropriate sentence.
You can use the captions.vtt file to see the times at which the words are spoken in the video. */


// EXCEEDS EXPECTATIONS //

// Embed the .vtt file as a closed captioning track and add a button to video controls to toggle captions on and off.

function closedCaptions() {
    if (vid.textTracks[0].mode == "hidden") {
        vid.textTracks[0].mode = "showing";
    }
    else {
        vid.textTracks[0].mode = "hidden";
    }
}

// A creative and thoughtful responsive design.

// Playback speed control or other helpful controls.

// Volume control so viewer can adjust the volume level, not just mute or on.
//done

// Playback controls include buffering progress of the downloaded video.

// When the user clicks on any sentence in the transcript the video player jumps to the appropriate time in the video.
