

// Implement the play and pause buttons.

function playPause(btn, vid) {
    var vid = document.getElementById(vid);
    if (vid.paused == true) {
        vid.play();
        btn.innerHTML = "<img src='icons/pause-icon.png' alt='pause'>";
    }
    else {
        vid.pause();
        btn.innerHTML = "<img src='icons/play-icon.png' alt='play'>";
    }
}

// Add volume button that lets you mute the sound or turn it on.

// Implement the fullscreen button.

/* Implement the playback progress control.
A user should be able to click anywhere on the playback bar to jump to that part of the video.
As the video plays the playback bar should fill in.
As the video plays the current time should be displayed and updated e.g. 0:10 / 11:34. */

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
