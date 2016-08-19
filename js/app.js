/* ----- VARIABLES ----- */

var vid = document.getElementById("my-video");
var videoBox = document.getElementById("video-box");
var playButton = document.getElementById("play-pause-btn");
var progressBar = document.getElementById("progress-bar");
var seekBar = document.getElementById("seek-slider");
var bufferBar = document.getElementById("buffer-bar");
var bufferAmount = document.getElementById("buffered-amount");
var currentTimeText = document.getElementById("current-time");
var durationTimeText = document.getElementById("duration-time");
var muteButton = document.getElementById("mute");
var captionButton = document.getElementById("caption-button");
var speed = document.getElementById("playback-speed");
var volumeBar = document.getElementById("volume-bar");
var fullScreenButton = document.getElementById("full-screen");
var controls = document.getElementById("video-controls");
var cues = document.querySelectorAll("span.cue");
var transcript = document.getElementById("transcript");


/* ----- INITIALIZE VIDEO PLAYER -----*/

function initializeVideo() {
	/* Set event listeners */
	playButton.addEventListener("click", playPause, false);
	seekBar.addEventListener("click", vidSeek, false);
	vid.addEventListener("timeupdate", seekTimeUpdate, false);
	vid.addEventListener("timeupdate", bufferUpdate, false);
	captionButton.addEventListener("click", closedCaptions, false);
	volumeBar.addEventListener("change", volumeControl, false);
	volumeBar.addEventListener("mouseup", volumeControl, false);
	muteButton.addEventListener("click", mute, false);
	speed.addEventListener("click", playBack, false);
	fullScreenButton.addEventListener("click", screenSize, false);
	videoBox.addEventListener("mouseleave", hideControls, false);
	videoBox.addEventListener("mouseenter", showControls, false);
	vid.addEventListener("playing", showProgress, false);
	vid.addEventListener("paused", showProgress, false);
	vid.addEventListener("timeupdate", highlightText, false);
	transcript.addEventListener("click", goToCue, false);

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

// Volume control so viewer can adjust the volume level
function volumeControl() {
	vid.volume = volumeBar.value;
	if (vid.volume == 0) {
		mute();
	}
	else if (vid.volume > 0) {
		vid.muted = false;
	}
}

// Add volume button that lets you mute the sound or turn it on
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


/* ----- FULLSCREEN BUTTON ----- */

function screenSize() {
	vid.removeAttribute("controls");
	if (vid.requestFullscreen) {
		videoBox.requestFullscreen();
//		controls.style.visibility = "hidden";
	} else if (vid.mozRequestFullScreen) {
		vid.mozRequestFullScreen(); // Firefox
//		controls.style.visibility = "hidden";
	} else if (vid.webkitRequestFullScreen) {
		vid.webkitRequestFullscreen(); // Chrome and Safari
		controls.style.visibility = "hidden";
	}
}


/* ----- PROGRESS BAR & TIME DISPLAY ----- */

/* Click anywhere on the playback bar to jump to that part of the video. */
function vidSeek(event) {
	//Calculate new time based on user click
	var seekUpdate = event.offsetX / this.offsetWidth;
	//Update video time
	vid.currentTime = seekUpdate * vid.duration;
	//Convert to percentage
	seekBar.value = seekUpdate / 100;
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

function bufferUpdate() {
	var bufferedEnd = vid.buffered.end(vid.buffered.length - 1);
	// Calculate the buffered bar progress value by percent
	var bufferValue = ((bufferedEnd / vid.duration)*100) + "%";

	if (vid.duration > 0) {
	  bufferAmount.style.width = bufferValue;
	}
}


/* ----- HIDE/SHOW VIDEO CONTROLS ----- */
/* Show the video player button on mouse hover states. Only the progress bar should remain. */

function hideControls() {
	if (vid.paused == false) {
	controls.style.visibility = "hidden";
	progressBar.style.transform = "translateY(50px)";
	}
}

function showProgress() {
	progressBar.style.visibility = "visible";
}

function showControls() {
	controls.style.visibility = "visible";
	progressBar.style.transform = "translateY(0)";

}


/* ----- HIGHLIGHT TRANSCRIPT ----- */
/* As the media playback time changes, sentences in the transcript should highlight.*/

// Highlight transcript
function highlightText() {
	//Get current video time
	var highlightTime = vid.currentTime;

		//Highlight span corresponding to current time
		function toggleHighlight(n) {
			// Removed highlight from any unclicked text
			for (var i=0; i < cues.length; i++) {
				cues[i].classList.remove("highlighted");
			}
			//Add highlighted class
			cues[n].classList.add('highlighted');
		}

		if (highlightTime > 0 && highlightTime < 4.13) {
			toggleHighlight(0);
		} else if (highlightTime > 4.13 && highlightTime < 7.535) {
			toggleHighlight(1);
		} else if (highlightTime > 7.535 && highlightTime < 11.27) {
			toggleHighlight(2);
		} else if (highlightTime > 11.27 && highlightTime < 13.96) {
			toggleHighlight(3);
		} else if (highlightTime > 13.96 && highlightTime < 17.94) {
			toggleHighlight(4);
		} else if (highlightTime > 17.94 && highlightTime < 22.37) {
			toggleHighlight(5);
		} else if (highlightTime > 22.37 && highlightTime < 26.88) {
			toggleHighlight(6);
		} else if (highlightTime > 26.88 && highlightTime < 32.1) {
			toggleHighlight(7);
		} else if (highlightTime > 32.1 && highlightTime < 34.73) {
			toggleHighlight(8);
		} else if (highlightTime > 34.73 && highlightTime < 39.43) {
			toggleHighlight(9);
		} else if (highlightTime > 39.43 && highlightTime < 42.35) {
			toggleHighlight(10);
		} else if (highlightTime > 42.35 && highlightTime < 46.3) {
			toggleHighlight(11);
		} else if (highlightTime > 46.3 && highlightTime < 49.27) {
			toggleHighlight(12);
		} else if (highlightTime > 49.27 && highlightTime < 53.76) {
			toggleHighlight(13);
		} else if (highlightTime > 53.76 && highlightTime < 57.78 ) {
			toggleHighlight(14);
		}
}

/* ----- Clickable Transcript ----- */
// Clicking on a phrase in the transcript jumps to that part of the video

function goToCue(event) {
	//List all cues
	var cueList = document.getElementsByClassName("cue");

	function getCue() {
		// Target cue that is clicked on
		var cueTime = event.target.getAttribute('data-start');
		// Set video time to data-start time
		vid.currentTime = cueTime;
		// Play the video
		vid.play();
	}
	//Set times for cueTime for list of cues
	for(var i=0; i < cues.length; i++) {
		cues[i].cueTime = getCue(event);
	}
}


/* ----- CLOSED CAPTIONS ----- */
// Toggle captions on and off.
function closedCaptions() {
	if (vid.textTracks[0].mode == "showing") {
		vid.textTracks[0].mode = "hidden";
	}
	else {
		vid.textTracks[0].mode = "showing";
	}
}

/* ----- PLAYBACK SPEED CONTROL ----- */
// Playback speed control or other helpful controls.
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
