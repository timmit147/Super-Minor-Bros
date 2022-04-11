// data
const timeline = [
    {
        year: 1985,
        month: 9,
        month_name: "September 1985",
        title: "Super Mario Brothers"
    },
    {
        year: 1986,
        month: 6,
        month_name: "June 1986",
        title: "Super Mario Bros: The Lost Levels"
    },
    {
        year: 1988,
        month: 10,
        month_name: "October 1988",
        title: "Super Mario Bros. 2"
    },
    {
        year: 1988,
        month: 10,
        month_name: "October 1988",
        title: "Super Mario Bros. 3"
    },
    { year: 1989, month: 4, month_name: "April 1989", title: "Super Mario Land" },
    {
        year: 1990,
        month: 11,
        month_name: "November 1990",
        title: "Super Mario World"
    },
    {
        year: 1992,
        month: 10,
        month_name: "October 1992",
        title: "Super Mario Land: 6 Golden Coins"
    },
    {
        year: 1995,
        month: 8,
        month_name: "August 1995",
        title: "Super Mario World 2: Yoshi's Island"
    },
    { year: 1996, month: 6, month_name: "June 1996", title: "Super Mario 64" },
    {
        year: 2002,
        month: 7,
        month_name: "July 2002",
        title: "Super Mario Sunshine"
    },
    {
        year: 2006,
        month: 5,
        month_name: "May 2006",
        title: "New Super Mario Bros."
    },
    {
        year: 2007,
        month: 11,
        month_name: "November 2007",
        title: "Super Mario Galaxy"
    },
    {
        year: 2009,
        month: 11,
        month_name: "November 2009",
        title: "New Super Mario Bros. Wii"
    },
    {
        year: 2010,
        month: 5,
        month_name: "May 2010",
        title: "Super Mario Galaxy 2"
    },
    {
        year: 2011,
        month: 11,
        month_name: "November 2011",
        title: "Super Mario 3D Land"
    },
    {
        year: 2012,
        month: 7,
        month_name: "July 2012",
        title: "New Super Mario Bros 2"
    },
    {
        year: 2012,
        month: 11,
        month_name: "November 2012",
        title: "New Super Mario Bros. U"
    },
    {
        year: 2013,
        month: 11,
        month_name: "November 2013",
        title: "Super Mario 3D World"
    },
    {
        year: 2015,
        month: 9,
        month_name: "September 2015",
        title: "Super Mario Maker"
    },
    {
        year: 2016,
        month: 12,
        month_name: "December 2016",
        title: "Super Mario Run"
    },
    {
        year: 2017,
        month: 10,
        month_name: "October 2017",
        title: "Super Mario Odyssey"
    },
    {
        year: 2019,
        month: 6,
        month_name: "June 2019",
        title: "Super Mario Maker 2"
    },
    {
        year: 2021,
        month: 2,
        month_name: "February 2021",
        title: "Super Mario 3D World + Bowser's Fury"
    }
];

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

    document.getElementById("headerInfo").style.display = "none";

    // clear old
    !currentPipe || currentPipe.classList.remove("active");

    // get index
    const index = parseInt(event.currentTarget.dataset.index);

    // walk
    const xpos = -100 - index * 150 - 25;
    const curXpos = -100 - currentIndex * 150 - 25;
    const distance = curXpos - xpos;
    const duration = Math.abs(distance) * 3;
    // console.log(distance);
    usersContainer.style.transitionDuration = `${duration}ms`;
    usersContainer.style.transform = `translateX(${xpos}px)`;
    ground.style.transitionDuration = `${duration}ms`;
    ground.style.backgroundPosition = `${xpos}px 32px`;
    grass.style.transitionDuration = `${duration}ms`;
    grass.style.backgroundPosition = `${xpos}px 0`;

    //
    playSfx("jump");

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
            playSfx("pipe");
        },
        duration,
        dir,
        event.currentTarget
    );

    // store position
    currentIndex = index;
    currentPipe = event.currentTarget;
};

// setup timeline
timeline.forEach((event, index) => {
    const e = document.createElement("div");
    e.classList.add("event");
    e.dataset.index = index;
    e.dataset.title = event.title;
    e.dataset.month = event.month_name;
    usersContainer.appendChild(e);
    e.addEventListener("click", pipeHandler.bind(this));
});

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
        "https://assets.codepen.io/439000/smb_pipe.mp3"
    ],
    ["jump", "pipe"]
);
