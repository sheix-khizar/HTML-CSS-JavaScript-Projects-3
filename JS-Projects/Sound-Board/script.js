// script.js
function playSound(soundId) {
    let sound = document.getElementById(soundId);
    sound.currentTime = 0; // Reset audio to start
    sound.play();
}
