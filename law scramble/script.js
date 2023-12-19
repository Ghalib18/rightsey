var selectedImage=document.querySelector(".imghint")
const wordText = document.querySelector(".word"),
    hintText = document.querySelector(".hint span"),
    timeText = document.querySelector(".time b"),
    inputField = document.querySelector(".input"),
    refreshBtn = document.querySelector(".refresh-word"),
    checkBtn = document.querySelector(".check-word")
const inputField1 = document.querySelector(".inputs")
const refreshbutton = document.querySelector(".refreshb")
let correctWord, timer;
let popup = document.getElementById("popup")
let win = document.getElementById("win")
let hintAnswer = document.getElementById("hint-answer")
let timeout = document.getElementById("timeout")
function openPopup() {
    popup.classList.add("open-popup");
}
const openhint = () => {
    hintAnswer.classList.add("open-win")
}
const openwin = () => {
    win.classList.add("open-win")
}

const closeWin = () => {
    win.classList.remove("open-win")
}
function opentimeout() {
    timeout.classList.add("open-timeout");
}

const initgame = () => {
    initTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    selectedImage.src=randomObj.imghint;
    correctWord = randomObj.word.toLocaleLowerCase();
    inputField.value = "";
    inputField.setAttribute("Maxlength", correctWord.length)
    console.log(randomObj);
}


let youtubeVideoIDs = [
    "cH-dDzqsiiU",
    "Cyq-0RZNrmw",
    "WdPnGoLKZzk",
    "7ZZGLiCgBXE",
    // "cScUz023JtQ",
    "6tcG4X1B8Vw",
    "FA3L57pQ9Ks",
    "7ZQyW5eRU1Q",
    "W48uPkSzgu4"
]

function getRandomValue(arr) {
    if (!arr.length) {
        return null; // Return null for an empty array
    }

    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: getRandomValue(youtubeVideoIDs),
        playerVars: {
            'playsinline': 1,
            'controls': 0,
            'autoplay': 0,
            'rel': 0
        },
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    //   event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    console.log(event)
    if (event.data == YT.PlayerState.ENDED) {
        player.destroy();
        const videoContainer = document.getElementById("video-container");
        videoContainer.style.visibility = "hidden";
        timeout.classList.remove("open-timeout");
        initgame();
    }
}
// function stopVideo() {
//   player.stopVideo();
// }

function closepopup() {
    popup.classList.remove("open-popup");
    // const videoContainer = document.getElementById("video-container");
    // videoContainer.style.visibility = "visible"
    // player.playVideo();
}

function closetimeout() {
    const videoContainer = document.getElementById("video-container");
    videoContainer.style.visibility = "visible"
    player.playVideo();
    timeout.classList.remove("open-timeout");
}

function hintClick() {
    const videoContainer = document.getElementById("video-container");
    videoContainer.style.visibility = "visible"
    player.playVideo();
    document.getElementById("answer-span").innerText = correctWord;
    openhint()
}

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        clearInterval(timer);
        opentimeout();
        initgame();
    }, 1000)
}



initgame();
const checkWord = () => {

    let userWord = inputField1.value.toLocaleLowerCase();
    if (!userWord) return alert("please Enter to check word");
    if (userWord !== correctWord)
        return openwin()
    openPopup();
    initgame();

}
refreshBtn.addEventListener("click", initgame);
checkBtn.addEventListener("click", checkWord);



// refreshbutton.addEventListener("click", window.location.reload)