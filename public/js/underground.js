// import { soundeffects } from "./script.js";
// import { playSfx } from "./script.js"
// import { loadBuffers } from "./script.js"

const marioFall = document.querySelector("#mario")
marioFall.classList.add("pipeFall")

var left = 0;

document.addEventListener("keydown", event => {
    if (event.code === "ArrowLeft") {
      left = left-1;
      var positionX = left * -180 + "px" ;
      document.querySelector(".flex-container").style.marginLeft = positionX;
      document.querySelector("#mario").className = '';
      document.querySelector("#head").style.backgroundPosition = `${-200 * left}px 00px`;
      document.querySelector("#footer").style.backgroundPosition = `${-200 * left}px 00px`;
      document.querySelector("#pipeTop").style.marginLeft = `${-200 * left}px`;
      document.querySelector("#mario").classList.add("walk-left");
      setTimeout(function() {
        document.querySelector("#mario").className = '';
      }, 500);
    } 

    if (event.code === "ArrowRight") {
        left = left+1;
        var positionX = left * -210 + "px" ;
        document.querySelector(".flex-container").style.marginLeft = positionX;
        document.querySelector("#head").style.backgroundPosition = `${-200 * left}px 00px`;
        document.querySelector("#footer").style.backgroundPosition = `${-200 * left}px 00px`;
        document.querySelector("#pipeTop").style.marginLeft = `${-200 * left}px`;
        document.querySelector("#mario").className = '';
        document.querySelector("#mario").classList.add("walk-right");
        setTimeout(function() {
            document.querySelector("#mario").className = '';
          }, 500);
      } 
  });


const buttonPipe = document.querySelector(".buttonPipe")
buttonPipe.addEventListener("click", function() {
    playSfx("downInPipe")

    window.setTimeout(function(){window.location.href = "/"} , 10);  
  });





 const canAudio = "AudioContext" in window || "webkitAudioContext" in window;
 const buffers = {};
 let context = void 0;
 
 if (canAudio) {
   var AudioContext = window.AudioContext || window.webkitAudioContext;
   context = new AudioContext(); // Make it crossbrowser
   var gainNode = context.createGain();
   gainNode.gain.value = 1; // set volume to 100%
 }
 
 export function playSfx(id) {
   if (!canAudio || !buffers.hasOwnProperty(id)) return;
   const buffer = buffers[id];
   const source = context.createBufferSource();
   source.buffer = buffer;
   source.connect(context.destination);
   source.start();
 };
 
 export function loadBuffers (files, ids) {
   if (typeof files == "string") files = [files];
   if (typeof ids == "string") ids = [ids];
   files.forEach((files, index) => {
     window
       .fetch(files)
       .then((response) => response.arrayBuffer())
       .then((arrayBuffer) =>
         context.decodeAudioData(
           arrayBuffer,
           (audioBuffer) => {
             buffers[ids[index]] = audioBuffer;
           },
           (error) => console.log(error)
         )
       );
   });
 };
 
 loadBuffers(
   [
     // "https://assets.codepen.io/439000/jump.mp3",
     "/images/jumpsound.mp4",
     // "https://storage.cloudconvert.com/tasks/89cf04a6-d9c6-40a8-984d-d247fc584d08/jumpsound.mp3?AWSAccessKeyId=cloudconvert-production&Expires=1649867519&Signature=gCt8jUm1X0k%2Fz9Wuqgh0M3Qf6Rg%3D&response-content-disposition=inline%3B%20filename%3D%22jumpsound.mp3%22&response-content-type=audio%2Fmpeg",
     // "https://storage.cloudconvert.com/tasks/eaf1a154-620c-4057-969e-8478ba622e49/repoPopup.mp3?AWSAccessKeyId=cloudconvert-production&Expires=1649785742&Signature=dHTA4y53Ptoxxg%2BfMN3C5ApvNNQ%3D&response-content-disposition=inline%3B%20filename%3D%22repoPopup.mp3%22&response-content-type=audio%2Fmpeg",
     "/images/repoPopup.mp3",
     // "https://assets.codepen.io/439000/smb_pipe.mp3"
     "/images/downPipe.mp4"
   ],
   ["jump", "repoVine", "downInPipe"]
 );
 
 
 
 


 
