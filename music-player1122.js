// Select elements
const queueElement = document.querySelector(".queue");
const playerTitle = document.querySelector(".player-title");
const playerArtist = document.querySelector(".player-artist");
const playerCover = document.querySelector(".player-cover");
const nowPlayingTitle = document.querySelector(".track-title");
const nowPlayingArtist = document.querySelector(".track-artist");
const nowPlayingCover = document.querySelector(".now-playing-cover");
const volumeSlider = document.getElementById("volume");
const progressBar = document.querySelector(".progress-bar");
const currentTimeElement = document.getElementById("current-time");
const totalDurationElement = document.getElementById("total-duration");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const shuffleBtn = document.getElementById("shuffle");
const repeatBtn = document.getElementById("repeat");

// Lyrics container
const lyricsElement = document.getElementById("lyrics");

let currentTrackIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

// Sample images
const images = [
  "https://i.scdn.co/image/ab67616d0000b2736fbb60d6a7e03ccb940a518e",
  "https://i1.sndcdn.com/artworks-3zuOIHWFC0aDyqIO-RaLfdQ-t500x500.jpg",
  "https://m.media-amazon.com/images/I/710W7Ptn-CL.jpg",
  "https://i.pinimg.com/736x/1d/25/ae/1d25ae71c062c8c5ed6cf696b0596463.jpg",
  "https://i.ytimg.com/vi/fPO76Jlnz6c/maxresdefault.jpg",
  "https://i1.sndcdn.com/artworks-ppKzNex5zlO63b16-on63Gg-t500x500.jpg",
  "https://i.ytimg.com/vi/msDb7hm3Nfs/maxresdefault.jpg",
  "https://lastfm.freetls.fastly.net/i/u/ar0/893aaca05cf048b1c8ac36db29eda502.jpg",
];

// Sample songs
const songs = [
  { title: "Sapphire", artist: "Ed Sheeran", src: "./ALL-songs/sapphaire.mp3", cover: images[0] },
  { title: "Beggin'", artist: "Måneskin", src: "./ALL-songs/beggin.mp3", cover: images[1] },
  { title: "7 Years", artist: "Lukas Graham", src: "./ALL-songs/7-years.mp3", cover: images[2] },
  { title: "Blinding light", artist: "The Weeknd", src: "./ALL-songs/blinding-light.mp3", cover: images[3] },
  { title: "Gangstas Paradise", artist: "Coolio", src: "./ALL-songs/Gangstas-paradise.mp3", cover: images[4] },
  { title: "Hope", artist: "XXXTentacion", src: "./ALL-songs/Hope.mp3", cover: images[5] },
  { title: "Lonely", artist: "Akon", src: "./ALL-songs/Lonely.mp3", cover: images[6] },
  { title: "The Nights", artist: "Avicii", src: "./ALL-songs/The-Nights.mp3", cover: images[7] }

];

// Lyrics data
const lyricsData = [
  {
    title: "Sapphire",
    lyrics: `“You're glowing  -  You colour and fracture the light  -  You can't help but shine  -  And I know that  -  You carry the world on your back  -  But look at you tonight-  -  The lights  -  Your face  -  Your eyes  -  Exploding like fireworks in the sky   -  Sapphire  -  Touching on your body while you're pushing on me  -  Don't you end the party, I could do this all week  -  We'll be dancing till the morning, go to bed, we won't sleep  -  ‘Cham-cham chamke sitare wargi’  -  Sapphire  -  Touching on your body while you're pushing on me  -  Don't you end the party, I could do this all week  -  We'll be dancing till the morning, go to bed, we won't sleep  -  ‘Cham-cham chamke sitare wargi’  -  Sapphire-  -  Look what we found, karma reached out  -  Into our hearts and pulled us to our feet now  -  You know, the truth is we could disappear  -  Anywhere, as long as I got you there  -  When the sun dies, till the day shines  -  When I'm with you, there's not enough time  -  You are my spring flower, watching you bloom, wow  -  We are surrounded, but I can only see-  -  The lights  -  Your face  -  Your eyes  -  Exploding like fireworks in the sky-  -  Sapphire  -  Touching on your body while you're pushing on me  -  Don't you end the party, I could do this all week  -  We'll be dancing till the morning, go to bed, we won't sleep  -  ‘Cham-cham chamke sitare wargi’  -  Sapphire  -  Touching on your body while you're pushing on me  -  Don't you end the party, I could do this all week  -  We'll be dancing till the morning, go to bed, we won't sleep  -  ‘Cham-cham chamke sitare wargi’-  -  You're glowing  -  You're glowing  -  You colour and fracture the light  -  Look at you tonight-  -  Sapphire  -  Touching on your body while you're pushing on me  -  Don't you end the party, I could do this all week  -  We'll be dancing till the morning, go to bed, we won't sleep  -  ‘Cham-cham chamke sitare wargi’  -  Sapphire  -  Touching on your body while you're pushing on me  -  Don't you end the party, I could do this all week  -  We'll be dancing till the morning, go to bed, we won't sleep  -  ‘Cham-cham chamke sitare wargi’”

` },

  {
    title: "Beggin'",
    lyrics: `Put your loving hand out, baby  'Cause I'm beggin'  I'm beggin', beggin' you  So put your loving hand out, baby  I'm beggin', beggin' you  So put your loving hand out, darlin'  Riding high when I was king  I played it hard and fast, 'cause I had everything  I walked away, you won me then  But easy come and easy go and it would end  So, anytime I bleed, you let me go  Yah, anytime I feed, you get me know  Anytime I seek, you let me know  But I planted that seed, just let me go  I'm on my knees when I'm beggin'  'Cause I don't wanna lose you  Hey, yeah, ra-ta-ta-ta!  'Cause I'm beggin', beggin' you  Uh, put your loving hand out, baby  I'm beggin', beggin' you, ah  And put your loving hand out, darlin'  I need you to understand  Tried so hard to be your man  The kind of man you want in the end  Only then can I begin to live again  An empty shell, I used to be  The shadow of my life was hangin' over me  A broken man that I don't know  Won't even stand the devil's dance to win my soul  What we doin'? What we chasin'?  Why the bottom? Why the basement?  Why we got good shit, don't embrace it?  Why the feel for the need to replace me?  You're the wrong way track from the good  I want to paint a picture tellin' where we could be at  Like a heart in the best way should  You can give it away, you had it and you took the pay  But I keep walkin' on, keep openin' doors  Keep hopin' for, now the door is yours  Keep also home  'Cause I don't want to live in a broken home, girl, I'm beggin'  Mmm, yeah-yeah, yeah, I'm beggin', beggin' you  So put your loving hand out, baby  I'm beggin', beggin' you  So put your loving hand out, darlin'  I'm fighting hard to hold my own  Just can't make it all alone  I'm holding on, I can't fall back  I'm just a calm, 'bout to fade to black  I'm beggin', beggin' you  Put your loving hand out, baby  I'm beggin', beggin' you  So put your loving hand out, darlin'  I'm beggin', beggin' you  So put your loving hand out, baby  I'm beggin', beggin' you  So put your loving hand out, darlin'  I'm beggin', beggin' you  So put your loving hand out, baby  I'm beggin', beggin' you  So put your loving hand out`
  },
  {
    title: "7 Years",
    lyrics: `"Once I was seven years old, my mama told me  - "Go make yourself some friends or you'll be lonely"  - Once I was seven years old  - It was a big big world, but we thought we were bigger  - Pushing each other to the limits, we were learning quicker  - By eleven smoking herb and drinking burning liquor  - Never rich so we were out to make that steady figure  - Once I was eleven years old, my daddy told me  - "Go get yourself a wife or you'll be lonely"  - Once I was eleven years old  - I always had that dream, like my daddy before me  - So I started writing songs, I started writing stories  - Something about that glory just always seemed to bore me  - 'Cause only those I really love will ever really know me  - Once I was twenty years old, my story got told  - Before the morning sun, when life was lonely  - Once I was twenty years old  - (Lukas Graham!)  - I only see my goals, I don't believe in failure  - 'Cause I know the smallest voices, they can make it major  - I got my boys with me, at least those in favor  - And if we don't meet before I leave, I hope I'll see you later  - Once I was twenty years old, my story got told  - I was writing 'bout everything I saw before me  - Once I was twenty years old  - Soon we'll be thirty years old, our songs have been sold  - We've traveled around the world and we're still roaming  - Soon we'll be thirty years old  - I'm still learning about life  - My woman brought children for me  - So I can sing them all my songs  - And I can tell them stories  - Most of my boys are with me  - Some are still out seeking glory  - And some I had to leave behind  - My brother, I'm still sorry  - Soon I'll be sixty years old, my daddy got sixty-one  - Remember life, and then your life becomes a better one  - I made a man so happy when I wrote a letter once  - I hope my children come and visit once or twice a month  - Soon I'll be sixty years old, will I think the world is cold  - Or will I have a lot of children who can warm me?  - Soon I'll be sixty years old  - Soon I'll be sixty years old, will I think the world is cold  - Or will I have a lot of children who can warm me?  - Soon I'll be sixty years old  - Once I was seven years old, my mama told me  - "Go make yourself some friends or you'll be lonely"  - Once I was seven years old  - Once I was seven years old." `
  },
  {
    title: "Blinding light",
    lyrics: `"Yeah - I've been tryna call - I've been on my own for long enough - Maybe you can show me how to love, maybe - I'm goin' through withdrawals - You don't even have to do too much - You can turn me on with just a touch, baby - I look around and - Sin City's cold and empty (oh) - No one's around to judge me (oh) - I can't see clearly when you're gone - I said, ooh, I'm blinded by the lights - No, I can't sleep until I feel your touch - I said, ooh, I'm drowning in the night - Oh, when I'm like this, you're the one I trust - (Hey, hey, hey) - I'm running out of time - 'Cause I can see the sun light up the sky - So I hit the road in overdrive, baby, oh - The city's cold and empty (oh) - No one's around to judge me (oh) - I can't see clearly when you're gone - I said, ooh, I'm blinded by the lights - No, I can't sleep until I feel your touch - I said, ooh, I'm drowning in the night - Oh, when I'm like this, you're the one I trust - I'm just walking by to let you know (by to let you know) - I could never say it on the phone (say it on the phone) - Will never let you go this time (ooh) - I said, ooh, I'm blinded by the lights - No, I can't sleep until I feel your touch - (Hey, hey, hey) - (Hey, hey, hey) - I said, ooh, I'm blinded by the lights - No, I can't sleep until I feel your touch",` 
  },
  {
    title: "without me",
    lyrics: `"Obie Trice & Eminem - Obie Trice, real name, no gimmicks - Ra— - Two trailer-park girls go round the outside - Round the outside, round the outside - Two trailer-park girls go round the outside - Round the outside, round the outside - Woo (Ooh, ooh) - [Refrain: Eminem] - Guess who's back, back again? - Shady's back, tell a friend - Guess who's back, guess who's back - Guess who's back, guess who's back - Guess who's back, guess who's back - Guess who's back - (Na-na-na, na, na, na, na, na, na) - (Na-na-na, na, na, na, na) - [Verse 1: Eminem] - I've created a monster - 'Cause nobody wants to see Marshall no more, they want Shady, I'm chopped liver - Well, if you want Shady, this is what I'll give ya - A little bit of weed mixed with some hard liquor - Some vodka that'll jump-start my heart quicker - Than a shock when I get shocked at the hospital - By the doctor when I'm not cooperating - When I'm rockin' the table while he's operating (Hey) - You waited this long, now stop debating - 'Cause I'm back, I'm on the rag and ovulating - I know that you got a job, Ms. Cheney - But your husband's heart problem's complicating - So the FCC won't let me be - Or let me be me, so let me see - They tried to shut me down on MTV - But it feels so empty without me - So come on and dip, bum on your lips - Fuck that, cum on your lips and some on your tits - And get ready, 'cause this shit's about to get heavy - I just settled all my lawsuits (Fuck you, Debbie) - [Chorus: Eminem] - Now, this looks like a job for me - So, everybody, just follow me - 'Cause we need a little controversy - 'Cause it feels so empty without me - I said this looks like a job for me - So, everybody, just follow me - 'Cause we need a little controversy - 'Cause it feels so empty without me - [Verse 2: Eminem] - Little hellions, kids feeling rebellious - Embarrassed, their parents still listen to Elvis - They start feelin' like prisoners, helpless - 'Til someone comes along on a mission and yells, "Bitch" - A visionary, vision is scary - Could start a revolution, pollutin' the airwaves - A rebel, so just let me revel and bask - In the fact that I got everyone kissin' my ass - And it's a disaster, such a catastrophe - For you to see so damn much of my ass, you asked for me? - Well, I'm back, da-na-na-na, na-na-na-na-na-na - Fix your bent antenna, tune it in, and then I'm gonna - Enter in and up under your skin like a splinter - The center of attention, back for the winter - I'm interesting, the best thing since wrestling - Infesting in your kid's ears and nesting - Testing, "Attention, please" - Feel the tension soon as someone mentions me - Here's my ten cents, my two cents is free - A nuisance, who sent? You sent for me? - [Chorus: Eminem] - Now, this looks like a job for me - So, everybody, just follow me - 'Cause we need a little controversy - 'Cause it feels so empty without me - I said this looks like a job for me - So, everybody, just follow me - 'Cause we need a little controversy - 'Cause it feels so empty without me - [Verse 3: Eminem] - A tisket, a tasket, I'll go tit-for-tat wit' - Anybody who's talkin', "This shit, that shit" - Chris Kirkpatrick, you can get your ass kicked - Worse than them little Limp Bizkit bastards - And Moby? You can get stomped by Obie - You thirty-six-year-old bald-headed fag, blow me - You don't know me, you're too old, let go - It's over, nobody listens to techno - Now, let's go, just give me the signal - I'll be there with a whole list full of new insults - I've been dope, suspenseful with a pencil - Ever since Prince turned himself into a symbol - But, sometimes, the shit just seems - Everybody only wants to discuss me - So this must mean I'm disgusting - But it's just me, I'm just obscene (Yeah) - Though I'm not the first king of controversy - I am the worst thing since Elvis Presley - To do Black music so selfishly - And use it to get myself wealthy (Hey) - There's a concept that works - Twenty million other white rappers emerge - But no matter how many fish in the sea - It'd be so empty without me - [Chorus: Eminem] - Now, this looks like a job for me - So, everybody, just follow me - 'Cause we need a little controversy - 'Cause it feels so empty without me - I said this looks like a job for me - So, everybody, just follow me - 'Cause we need a little controversy - 'Cause it feels so empty without me - [Outro: Eminem] - Hum, dei-dei, la-la - La-la, la-la-la - La-la, la-la-la - La-la, la-la - Hum, dei-dei, la-la - La-la, la-la-la - La-la, la-la-la - La-la, la-la - Kids"`
  },
  {
    title: " ",
    lyrics: ` `
  }







];

// Initialize audio
let audio = new Audio(songs[currentTrackIndex].src);

// Function to format time in mm:ss
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Function to update lyrics
function updateLyrics(track) {
  const songLyrics = lyricsData.find(item => item.title === track.title);
  if (songLyrics) {
    lyricsElement.innerHTML = `<div class="queue-item"><div class="queue-info">${songLyrics.lyrics}</div></div>`;
  } else {
    lyricsElement.innerHTML = `<div class="queue-item"><div class="queue-info">Lyrics not available.</div></div>`;
  }
}

// Merged updatePlayer function
function updatePlayer(track) {
  playerTitle.textContent = track.title;
  playerArtist.textContent = track.artist;
  playerCover.src = track.cover;

  nowPlayingTitle.textContent = track.title;
  nowPlayingArtist.textContent = track.artist;
  nowPlayingCover.src = track.cover;

  audio.src = track.src;

  updateLyrics(track);
}

// Create the queue dynamically
songs.forEach((song, index) => {
  const div = document.createElement("div");
  div.classList.add("queue-item");

  const img = document.createElement("img");
  img.src = song.cover;
  img.alt = song.title;

  const info = document.createElement("div");
  info.classList.add("queue-info");
  info.textContent = song.title;

const duration = document.createElement("div");
duration.classList.add("queue-duration");
duration.textContent = "00:00"; // temporary before loading

// Create a temporary audio element to load metadata and get duration
const tempAudio = new Audio(song.src);
tempAudio.addEventListener("loadedmetadata", () => {
  duration.textContent = formatTime(tempAudio.duration);
});

  div.appendChild(img);
  div.appendChild(info);
  div.appendChild(duration);

  div.addEventListener("click", () => {
    currentTrackIndex = index;
    updatePlayer(songs[currentTrackIndex]);
    audio.play();
    isPlaying = true;
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  });

  queueElement.appendChild(div);
});

// Toggle play/pause
function togglePlay() {
  if (isPlaying) {
    audio.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  } else {
    audio.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  }
  isPlaying = !isPlaying;
}

// Next track
function nextTrack() {
  if (isShuffle) {
    currentTrackIndex = Math.floor(Math.random() * songs.length);
  } else {
    currentTrackIndex = (currentTrackIndex + 1) % songs.length;
  }
  updatePlayer(songs[currentTrackIndex]);
  audio.play();
  isPlaying = true;
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

// Previous track
function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + songs.length) % songs.length;
  updatePlayer(songs[currentTrackIndex]);
  audio.play();
  isPlaying = true;
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

// Shuffle toggle
if (shuffleBtn) {
  shuffleBtn.addEventListener("click", () => {
    isShuffle = !isShuffle;
    shuffleBtn.style.opacity = isShuffle ? "1" : "0.5";
  });
}

// Repeat toggle
if (repeatBtn) {
  repeatBtn.addEventListener("click", () => {
    isRepeat = !isRepeat;
    repeatBtn.style.opacity = isRepeat ? "1" : "0.5";
  });
}

// Volume control
if (volumeSlider) {
  volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
  });
}

// Progress bar update
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    let progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progress + "%";
    currentTimeElement.textContent = formatTime(audio.currentTime);
  }
});

// Update total duration once metadata is loaded
audio.addEventListener("loadedmetadata", () => {
  totalDurationElement.textContent = formatTime(audio.duration);
});

// Handle song end
audio.addEventListener("ended", () => {
  if (isRepeat) {
    audio.currentTime = 0;
    audio.play();
  } else {
    nextTrack();
  }
});

// Button event listeners
playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);

// Initialize the player
updatePlayer(songs[currentTrackIndex]);


















// Seek functionality — user can click or drag on the progress container
const progressContainer = document.querySelector(".progress-container");

progressContainer.addEventListener("click", function(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  if (duration) {
    audio.currentTime = (clickX / width) * duration;
  }
});























let isDragging = false;

progressContainer.addEventListener("mousedown", () => {
  isDragging = true;
});

progressContainer.addEventListener("mouseup", () => {
  isDragging = false;
});

progressContainer.addEventListener("mousemove", function(e) {
  if (isDragging) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    if (duration) {
      audio.currentTime = (clickX / width) * duration;
    }
  }
});


// side menu bar
const menuBtn = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".ssidebar");
const links = document.querySelectorAll(".ssidebar nav ul li a");

let menuOpen = false; // track sidebar state

// Toggle sidebar
menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  menuOpen = !menuOpen;

  if (menuOpen) {
    menuBtn.innerHTML = '<i class="fa-solid fa-xmark" style="color:white;"></i>'; // show white X
  } else {
    menuBtn.innerHTML = '<i class="fa-solid fa-bars" style="color:black;"></i>'; // show white bars
  }
});

// Close sidebar when link clicked
links.forEach(link => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("active");
    menuBtn.innerHTML = '<i class="fa-solid fa-bars" style="color:white;"></i>'; // reset to white bars
    menuOpen = false;
  });
});
















