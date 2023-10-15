const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEL = document.getElementById("current-time");
const durationEL = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// Music
const songs = [
  {
    name: "project-1",
    displayName: "Night Away",
    artist: "A1 X J1 Ft Tion Wayne",
  },
  {
    name: "project-2",
    displayName: "IDG",
    artist: "Asa Ft Wizkid",
  },
  {
    name: "project-3",
    displayName: "Lonely At The Top",
    artist: "Asake",
  },
  {
    name: "project-4",
    displayName: "Kwaku The Traveler",
    artist: "Black Sherif",
  },
];

// Check if playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  music.play();
  playBtn.classList.replace("bx-play", "bx-pause");
}

// Pause
function PauseSong() {
  isPlaying = false;
  music.pause();
  playBtn.classList.replace("bx-pause", "bx-play");
}

// Play or Pause Event Listener
playBtn.addEventListener("click", () => (isPlaying ? PauseSong() : playSong()));

function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `./images/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

loadSong(songs[songIndex]);

// Update Progress Bar
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    const progressPercentage = (currentTime / duration) * 100;
    progress.style.width = `${progressPercentage}%`;
    const durationMinutes = Math.floor(duration / 60);
    console.log("minutes", durationMinutes);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    console.log(durationSeconds);
    if (durationSeconds) {
      durationEL.textContent = `${durationMinutes} : ${durationSeconds}`;
    }
    const currentMinutes = Math.floor(currentTime / 60);
    console.log("minutes", currentMinutes);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    console.log("seconds", currentSeconds);
    currentTimeEL.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

function setProgressBar(e) {
  const width = this.clientWidth;
  console.log("width", width);
  const clickX = e.offsetX;
  console.log("clickX", clickX);
  const { duration } = music;
  console.log(clickX / width);
  console.log((clickX / width) * duration);
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
