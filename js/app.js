/* ----- VARIABLES ----- */

var vid = document.getElementById("my-video");
var videoBox = document.getElementById("video-box");
var playButton = document.getElementById("play-pause-btn");
var progressBar = document.getElementById("progress-bar");
var seekBar = document.getElementById("seek-slider");
var bufferBar = document.getElementById("buffer-bar");
var currentTimeText = document.getElementById("current-time");
var durationTimeText = document.getElementById("duration-time");
var muteButton = document.getElementById("mute");
var captionButton = document.getElementById("caption-button");
var speed = document.getElementById("playback-speed");
var volumeBar = document.getElementById("volume-bar");
var fullScreen = document.getElementById("full-screen");
var controls = document.getElementById("video-controls");


/* ----- INITIALIZE VIDEO PLAYER -----*/

function initializeVideo() {
    /* Set event listeners */
    playButton.addEventListener("click", playPause, false);
    seekBar.addEventListener("change", vidSeek, false);
//    bufferBar.addEventListener("change", bufferUpdate, false);
    vid.addEventListener("timeupdate", seekTimeUpdate, false);
    captionButton.addEventListener("click", closedCaptions, false);
    volumeBar.addEventListener("change", volumeControl, false);
    muteButton.addEventListener("click", mute, false);
    speed.addEventListener("click", playBack, false);
    fullScreen.addEventListener("click", screenSize, false);
    videoBox.addEventListener("mouseleave", hideControls, false);
    videoBox.addEventListener("mouseenter", showControls, false);
    vid.addEventListener("playing", showProgress, false);
    vid.addEventListener("paused", showProgress, false);
    vid.addEventListener("timeupdate", highlightText, false);


    /* Set default volume level. */
    vid.volume = 0.5;

    /* Set default video playback speed */
    vid.defaultPlayRate = 1.0;
}

/* Initialize player on window load */
window.onload = initializeVideo;

/* ----- PLAY/PAUSE BUTTON ----- */
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

/* ----- VOLUME CONTROLS ----- */

// Volume control so viewer can adjust the volume level, not just mute or on.

function volumeControl() {
    vid.volume = volumeBar.value;
}

// Add volume button that lets you mute the sound or turn it on.

function mute() {
    if (vid.muted == false) {
        // Mute the video
        vid.muted = true;
        // Update the button text
        muteButton.innerHTML = "<img src='icons/volume-on-icon.png'>";
        // Update volume bar
        volumeBar.value = 0;
        // Need to figure out why slider doesn't go all the way down to zero.

    } else {
        // Unmute the video
        vid.muted = false;
        // Update the button text
        muteButton.innerHTML = "<img src='icons/volume-off-icon.png'>";
        //Set video bar back to previous value
        volumeBar.value = vid.volume;
  }
}

/* ----- FULLSCREEN BUTTON ----- */

function screenSize() {
    if (vid.requestFullscreen) {
    vid.requestFullscreen();
    } else if (vid.mozRequestFullScreen) {
    vid.mozRequestFullScreen(); // Firefox
    } else if (vid.webkitRequestFullscreen) {
    vid.webkitRequestFullscreen(); // Chrome and Safari
    }
}

/* ----- PROGRESS BAR & TIME DISPLAY ----- */

/* Click anywhere on the playback bar to jump to that part of the video. */
function vidSeek() {
    //Calculate new time
    var seek = vid.duration * (seekBar.value / 100);
    //Update video time
    vid.currentTime = seek;
}

function seekTimeUpdate() {
    /* Fill in playback bar as video plays */
    var newTime = vid.currentTime * (100 / vid.duration);
    seekBar.value = newTime;

    /* Display current time / duration */
    var currentMinutes = Math.floor(vid.currentTime / 60);
    var currentSeconds = Math.floor(vid.currentTime - currentMinutes * 60);

    if (currentSeconds < 10) {
        currentSeconds = "0"+currentSeconds;
    }

    var durationMinutes = Math.floor(vid.duration / 60);
    var durationSeconds = Math.floor(vid.duration - durationMinutes * 60);

    if (durationSeconds < 10) {
        durationSeconds = "0"+durationSeconds;
    }

    currentTimeText.innerHTML = currentMinutes + ":" + currentSeconds;
    durationTimeText.innerHTML = durationMinutes + ":" + durationSeconds;
}

/* ---- BUFFER PROGRESS BAR ----- */

/*function bufferUpdate() {
    if (vid.buffered.length > 0) {
// Calculate the buffered bar progress value by percent
    var bufferValue = (vid.buffered.end(0) / vid.duration) * 100;
// Update the buffered bar value
    bufferBar.value = bufferValue;
}
}*/

/* ----- HIDE/SHOW VIDEO CONTROLS ----- */
/* Use Javascript or CSS to hide and show the video player button on mouse hover states. Only the progress bar should remain. */

// Still need to make progress bar go away when video is not playing and mouse is not hovering.

function hideControls() {
    controls.style.visibility = "hidden";
}

function showProgress() {
    progressBar.style.visibility = "visible";
}

function showControls() {
    controls.style.visibility = "visible";
}

/* ----- HIGHLIGHT TRANSCRIPT ----- */
/* As the media playback time changes, sentences in the transcript should highlight.
Use JavaScript to listen for those changes and apply a highlight to the appropriate sentence.
You can use the captions.vtt file to see the times at which the words are spoken in the video. */

/* Idea seen in chat */

// Highlight transcript
function highlightText() {
    var startHighlight = vid.currentTime;
    console.log(startHighlight);
    var highlight = document.querySelectorAll('data-start');
    function startHighlight() {
        startHighlight.classList.remove('boo');
        startHighlight.classList.add('boo');
    }
        if (highlight > 0 && highlight < 4.13) {
            startHighlight(0);
        } else if (highlight > 4.13 && highlight < 7.535) {
            startHighlight(4.13);
        } else if (highlight > 7.535 && highlight < 11.27) {
            startHighlight(7.535);
        } else if (highlight > 11.27 && highlight < 13.96) {
            startHighlight(11.27);
        } else if (highlight > 13.96 && highlight < 17.94) {
            startHighlight(13.96);
        } else if (highlight > 17.94 && highlight < 22.37) {
            startHighlight(17.94);
        } else if (highlight > 22.37 && highlight < 26.88) {
            startHighlight(22.37);
        }
}

/* ----- CLOSED CAPTIONS ----- */

// Toggle captions on and off.

function closedCaptions() {
    if (vid.textTracks[0].mode == "hidden") {
        vid.textTracks[0].mode = "showing";
    }
    else {
        vid.textTracks[0].mode = "hidden";
    }
}

// A creative and thoughtful responsive design.

/* ----- PLAYBACK SPEED CONTROL ----- */
// Playback speed control or other helpful controls.
/* Need to add icon for this */
function playBack() {
    if (vid.playbackRate == 1.0) {
        vid.playbackRate = 1.5;
        speed.innerText = "1x"; //replace with icon
    }
    else {
        vid.playbackRate = 1.0;
        speed.innerText = "1.5x"; //replace with icon
    }
}


// When the user clicks on any sentence in the transcript the video player jumps to the appropriate time in the video.
