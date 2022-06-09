let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.querySelector("#masterPlay");
let myProgressBar = document.querySelector("#myProgressBar");
let gif = document.querySelector("#gif");
let startingTime = document.querySelector("#startingTime");
let duration = document.querySelector("#duration");
let next=document.querySelector('#forward');
let previous=document.querySelector('#backward');
let songIndex = 0;
let songs = [
  {
    songName: "dildaara",
    filePath: "songs/1.mp3",
    coverPath: "cover/1.jpg",
    
  },
  {
    songName: "chammak chalo",
    filePath: "songs/2.mp3",
    coverPath: "cover/2.jpg",
    
  },
  {
    songName: "ghana kasoota",
    filePath: "songs/3.mp3",
    coverPath: "cover/3.jpg",
    
  },
  {
    songName: "tum hi ho",
    filePath: "songs/4.mp3",
    coverPath: "cover/4.jpg",
    
  },
  {
    songName: "tera ghata",
    filePath: "songs/5.mp3",
    coverPath: "cover/5.jpg",
    
  },
  {
    songName: "kabhi jo badal barse",
    filePath: "songs/6.mp3",
    coverPath: "cover/6.jpg",
    
  },
  {
    songName: "tu aake dekhle",
    filePath: "songs/7.mp3",
    coverPath: "cover/7.jpg",
    
  },
  { songName: "chididya", filePath: "songs/8.mp3", coverPath: "cover/8.jpg" },
  {
    songName: "jeena jeena",
    filePath: "songs/9.mp3",
    coverPath: "cover/9.jpg",
    
  },
  {
    songName: "tum hi ho bandhu",
    filePath: "songs/10.mp3",
    coverPath: "cover/10.jpg",
    
  },
];
let mySongs = document.querySelectorAll(".mySongs");
let allcoverImages = document.querySelectorAll(".coverImage");
allcoverImages = Array.from(allcoverImages);
allcoverImages.forEach((element, i) => {
  element.src = `cover/${i + 1}.jpg`;
});
const songPlay = document.querySelectorAll(".songPlay");
// making all buttons play
const makeAllPlays = () => {
  Array.from(songPlay).forEach((element) => {
    element.src = "play-button.png";
  });
};
// handling play/pause buttons
Array.from(songPlay).forEach((element, i) => {
  element.addEventListener("click", () => {
    makeAllPlays();
    if (audioElement.paused) {
      element.src = "pause-button.png";
      audioElement.src = `songs/${i + 1}.mp3`;
      masterSongName.innerHTML=songs[i].songName;
      masterPlay.src = "pause.png";
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
    } else {
      element.src = "play-button.png";
      audioElement.pause();
      masterPlay.src = "play.png";
      gif.style.opacity = 0;
    }
  });
});

masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime == 0) {
    audioElement.play();
    masterPlay.src = "pause.png";
    gif.style.opacity = 1;
    // songPlay[songIndex].src="pause-button.png";
    songs.forEach((element,i)=>{
      if(element.songName==masterSongName.innerHTML){
        songPlay[i].src="pause-button.png";
      }
    })
  } else {
    audioElement.pause();
    masterPlay.src = "play.png";
    gif.style.opacity = 0;
    // songPlay[songIndex].src="play-button.png";
    songs.forEach((element,i)=>{
      if(element.songName==masterSongName.innerHTML){
        songPlay[i].src="play-button.png";
      }
    })
  }
});
function convertHMS(value) {
  const sec = parseInt(value, 10); // convert value to number if it's string
  let hours = parseInt(sec / 3600); // get hours
  let minutes = parseInt((sec - hours * 3600) / 60); // get minutes
  let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
  // add 0 if value < 10; Example: 2 => 02
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds; // Return is HH : MM : SS
}
// updating the seekbar
audioElement.addEventListener("timeupdate", () => {
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  myProgressBar.value = progress;
  startingTime.innerHTML = convertHMS(audioElement.currentTime);
  duration.innerHTML = convertHMS(audioElement.duration);
  if (audioElement.currentTime == audioElement.duration) {
    audioElement.pause();
    masterPlay.src = "play.png";
    gif.style.opacity = 0;
  }
});
// changing the current time of audioElement with seekbar
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

next.addEventListener('click', ()=>{
  if(songIndex>=9){
      songIndex = 0
  }
  else{
      songIndex += 1;
  }
  audioElement.src = `songs/${songIndex+1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.src="pause.png";
  gif.style.opacity=1;
})

previous.addEventListener('click',()=>{
  if(songIndex==0){
    songIndex=9;
  }
  else{
    songIndex-=1;
  }
  audioElement.src = `songs/${songIndex-1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.src="pause.png";
  gif.style.opacity=1;
})
