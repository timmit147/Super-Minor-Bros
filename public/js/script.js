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

    // document.getElementById("headerInfo").style.display = "none";

    // clear old
    !currentPipe || currentPipe.classList.remove("active");

    // get index
    const index = parseInt(event.currentTarget.dataset.index);

    // walk
    const xpos = -100 - index * 150 - 25;
    const curXpos = -100 - currentIndex * 150 - 25;
    const distance = curXpos - xpos;
    const duration = Math.abs(distance) * 2;
    // console.log(distance);
    usersContainer.style.transitionDuration = `${duration}ms`;
    usersContainer.style.transform = `translateX(${xpos}px)`;
    ground.style.transitionDuration = `${duration}ms`;
    ground.style.backgroundPosition = `${xpos}px 32px`;
    grass.style.transitionDuration = `${duration}ms`;
    grass.style.backgroundPosition = `${xpos}px 0`;

    // //
    // playSfx("jump");

    // walk style
    const dir = distance < 0 ? "left" : "right";
    mario.classList.remove(
        "idle",
        "walk-left",
        "walk-right",
        "search-left",
        "search-right"
    );
    mario.classList.add(`walk-${dir}`);
    int1 = setTimeout(
        (dir, target) => {
            mario.classList.remove(`walk-${dir}`);
            mario.classList.add(`search-${dir}`);
            target.classList.add("active");
            playSfx("repoVine");
        },
        duration,
        dir,
        event.currentTarget
    );

    // store position
    currentIndex = index;
    currentPipe = event.currentTarget;
};


// // setup timeline
gitUsers.forEach((event, index) => {
    const e = document.createElement("div");
    e.classList.add("event");
    e.dataset.index = index;
    e.dataset.title = "Repositories:" + gitUsers[index].node.owner.repositories.totalCount;
    e.dataset.month = gitUsers[index].node.owner.login;
    usersContainer.appendChild(e);
    e.addEventListener("click", pipeHandler.bind(this));
});

// console.log(gitUsers);
// for (key of gitUsers) {
//     console.log(gitUsers[key]);
//     // console.log(gitUsers[key].node.owner.login);
//   }

/**
 * Audio handling
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

const loadBuffers = (urls, ids) => {
    if (typeof urls == "string") urls = [urls];
    if (typeof ids == "string") ids = [ids];
    urls.forEach((url, index) => {
        window
            .fetch(url)
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
        "https://assets.codepen.io/439000/jump.mp3",
        "https://storage.cloudconvert.com/tasks/eaf1a154-620c-4057-969e-8478ba622e49/repoPopup.mp3?AWSAccessKeyId=cloudconvert-production&Expires=1649785742&Signature=dHTA4y53Ptoxxg%2BfMN3C5ApvNNQ%3D&response-content-disposition=inline%3B%20filename%3D%22repoPopup.mp3%22&response-content-type=audio%2Fmpeg",
        "https://assets.codepen.io/439000/smb_pipe.mp3"
    ],
    ["jump", "repoVine", "downInPipe"]
);
