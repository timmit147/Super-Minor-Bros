// data
//
const mario = document.getElementById("mario");
const ground = document.getElementById("ground");
const grass = document.getElementById("grass");
const usersContainer = document.getElementById("users");
let currentIndex = -1;
let currentPipe;
let int1;

// click handler
const pipeHandler = (event) => {
  clearInterval(int1);

  // clear old so you only get one button with repo at a time and it leaves afterwards
  !currentPipe || currentPipe.classList.remove("active");
  // console.log('removed the button with repos when mario is not standing underneath')

  // get index
  const index = parseInt(event.currentTarget.dataset.index);

  walk(index, event)

  // store position
  currentIndex = index;
  currentPipe = event.currentTarget;
};

// // setup all the pipes with gitUsers 
gitUsers.forEach((event, index) => {
  const e = document.createElement("div");
  const l = document.createElement("button");
  e.classList.add("pipe");
  l.innerHTML = "Repositories:" + gitUsers[index].node.owner.repositories.totalCount;

  // l.onclick = function () {
  //   window.location.href = "/underground/" + gitUsers[index].node.owner.login;
  // };
  l.onmouseover = function(){
    mario.classList.add("jump")
    mario.classList.remove("search-right")
    mario.classList.remove("walk-left")
  }; 

  l.onmouseenter = function() {
    playSfx("jump");
  }

  l.onclick = function () {
    mario.classList.add("down-pipe")
    mario.classList.remove("search-right");
    
    playSfx("downInPipe");
    // mario.classList.add("go-down-pipe")
    window.setTimeout(function delayUnderground() {
      window.location.href = "/underground/" + gitUsers[index].node.owner.login;
  }, 1000);
    // mario.classList.add("jump");
  };

  l.onmouseout = function() {
    mario.classList.remove("jump")
    mario.classList.remove("down-pipe")
  };

  // l.onclick = function () {
  //   // mario.classList.add("jump");
  //   // mario.classList.remove(`search-${dir}`);
  //   window.location.href = "/underground/" + gitUsers[index].node.owner.login
  //   // playSfx("downInPipe");
  // };

  

//   l.onclick = window.setTimeout(function delayUnderground() {
//     window.location.href = "/underground/" + gitUsers[index].node.owner.login;
// }, 10000);

  e.dataset.index = index;
  e.dataset.repocount = "Repositories:" + gitUsers[index].node.owner.repositories.totalCount;
  e.dataset.usernames = gitUsers[index].node.owner.login;
  e.appendChild(l);
  usersContainer.appendChild(e);
  e.addEventListener("click", pipeHandler.bind(this));
});


// console.log(gitUsers);
// for (key of gitUsers) {
//     console.log(gitUsers[key]);
//     // console.log(gitUsers[key].node.owner.login);
//   }

/**
 * sound effects
 */
const canAudio = "AudioContext" in window || "webkitAudioContext" in window;
const buffers = {};
let context = void 0;

if (canAudio) {
  var AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext(); // Make it crossbrowser
  var gainNode = context.createGain();
  gainNode.gain.value = 1; // set volume to 100%
}

const playSfx = function play(id) {
  if (!canAudio || !buffers.hasOwnProperty(id)) return;
  const buffer = buffers[id];
  const source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start();
};

const loadBuffers = (files, ids) => {
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


// Left
  document.addEventListener("keydown", event => {
    if (event.code === "ArrowLeft") {
        mario.classList.add('walk-left')
      console.log('key addvent: left')
    } 
  });
  document.addEventListener("keyup", event => {
    if (event.code === "ArrowLeft") {
        mario.classList.remove('walk-left', 'users')
        usersContainer.classList.add('users')
      console.log('key addvent: left')
    } 
  });
// Right
  document.addEventListener("keydown", event => {
    if (event.code === "ArrowRight") {
        mario.classList.add('walk-right')
        console.log('key addvent: right')
      } 
    });
    document.addEventListener("keyup", event => {
        if (event.code === "ArrowRight") {
            mario.classList.remove('walk-right')
            usersContainer.classList.add('users')
            console.log('key addvent: right')
          } 
        });
// Jumpen en in pijpje 
  document.addEventListener("keydown", event => {
    if (event.code === "Space") {
      console.log('key addvent: space')
    } 
  });








  function walk(index, event) {
  // walk
  const xpos = -100 - index * 150 - 25;
  const curXpos = -100 - currentIndex * 150 - 25;
  const distance = curXpos - xpos;
  const duration = Math.abs(distance) * 2;
  console.log(distance);
  usersContainer.style.transitionDuration = `${duration}ms`;
  usersContainer.style.transform = `translateX(${xpos}px)`;
  ground.style.transitionDuration = `${duration}ms`;
  ground.style.backgroundPosition = `${xpos}px 32px`;
  grass.style.transitionDuration = `${duration}ms`;
  grass.style.backgroundPosition = `${xpos}px 0`;

  playSfx("repoVine");
  
  // walk style so you can see the feet move 
  const dir = distance < 0 ? "left" : "right";
  mario.classList.remove(
    "idle",
    "walk-left",
    "walk-right",
    "search-left",
    "search-right",
    "go-down-pipe"
    // "jump"
  );
  mario.classList.add(`walk-${dir}`);
  int1 = setTimeout(
    (dir, target) => {
      mario.classList.remove(`walk-${dir}`);
      mario.classList.add(`search-${dir}`);
      target.classList.add("active");
      // playSfx("repoVine");
    },
    duration,
    dir,
    event.currentTarget
  );
  }