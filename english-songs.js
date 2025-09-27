
    // ======= Data =========
    const songs = [
      { title: "Sapphire",        artist: "Ed Sheeran",      src: "./ALL-songs/sapphaire.mp3",      cover: "https://i.scdn.co/image/ab67616d0000b2736fbb60d6a7e03ccb940a518e", lyrics: `Sapphire lyricsapphire ly ri csa pp h ire ly ric sa pp hi re lyr ic sa pp hire lyri cs app hire lyr icsa pphi re lyr ic sapp hire lyric sapphire lyrics app hire lyri csa pphire  lyricsapphire lyricsapphire lyricsapphire lyricsapphire lyricsapphire lyricsapphire lyricsapphire lyricsapphire lyricsapphire lyricsapphire lyricsapphire lyricsapphire lyricsapphire lyricsapphire lyricsapphire lyricsapphire lyricsapphire lyricsapphire lyricsapphire lyricsapphire lyricsapphire lyricsapphire lyricsapphire lyricsapphire lyricsapphire lyricsapphire lyricsapphire lyricsapphire lyricsapphire lyricsapphire lyricsapphire lyricsapphire lyricsapphire lyricsapphire lyricsapphire lyrics...` },
      { title: "Beggin'",         artist: "Måneskin",        src: "./ALL-songs/beggin.mp3",         cover: "https://i1.sndcdn.com/artworks-3zuOIHWFC0aDyqIO-RaLfdQ-t500x500.jpg", lyrics: `Put your loving hand out, baby..` }, 
      { title: "7 Years",         artist: "Lukas Graham",    src: "./ALL-songs/7-years.mp3",       cover: "https://m.media-amazon.com/images/I/710W7Ptn-CL.jpg", lyrics: `Once I was seven years old...` },
      { title: "Blinding Light",  artist: "The Weeknd",      src: "./ALL-songs/blinding-light.mp3", cover: "https://i.pinimg.com/736x/1d/25/ae/1d25ae71c062c8c5ed6cf696b0596463.jpg", lyrics: `I said, ooh, I'm blinded by the lights...` },
      { title: "Without Me",      artist: "Eminem",          src: "./ALL-songs/without-me.mp3",     cover: "https://images.genius.com/43c0028d130e85df2c466f2075684dbe.1000x1000x1.png", lyrics: `Guess who's back, back again...` },
        { title: "Beggin'",         artist: "Måneskin",        src: "./ALL-songs/beggin.mp3",         cover: "https://i1.sndcdn.com/artworks-3zuOIHWFC0aDyqIO-RaLfdQ-t500x500.jpg", lyrics: `Put your loving hand out, baby...` },
      { title: "7 Years",         artist: "Lukas Graham",    src: "./ALL-songs/7-years.mp3",       cover: "https://m.media-amazon.com/images/I/710W7Ptn-CL.jpg", lyrics: `Once I was seven years old...` },
      { title: "Blinding Light",  artist: "The Weeknd",      src: "./ALL-songs/blinding-light.mp3", cover: "https://i.pinimg.com/736x/1d/25/ae/1d25ae71c062c8c5ed6cf696b0596463.jpg", lyrics: `I said, ooh, I'm blinded by the lights...` },
      
      { title: "The Nights",      artist: "Avicii",          src: "./ALL-songs/The-Nights.mp3",     cover: "https://lastfm.freetls.fastly.net/i/u/ar0/893aaca05cf048b1c8ac36db29eda502.jpg", lyrics: `He said, one day you'll leave this world behind...` }
    ];

    // ======= Elements =======
    const queueList = document.querySelector('.queue-list');
    const recentlyPlayed = document.getElementById('recently-played');
    const playerTitle = document.querySelector('.player-title');
    const playerArtist = document.querySelector('.player-artist');
    const playerCover = document.querySelector('.player-cover');
    const playBtn = document.getElementById('play');
    const nextBtn = document.getElementById('next');
    const prevBtn = document.getElementById('prev');
    const shuffleBtn = document.getElementById('shuffle');
    const repeatBtn = document.getElementById('repeat');
    const progressBar = document.querySelector('.progress-bar');
    const progressContainer = document.querySelector('.progress-container');
    const currentTimeEl = document.getElementById('current-time');
    const totalDurationEl = document.getElementById('total-duration');
    const volumeSlider = document.getElementById('volume');
    const lyricsEl = document.getElementById('lyrics');

    // ======= State =======
    let currentTrackIndex = 0;
    let isPlaying = false;
    let isShuffle = false;
    let isRepeat = false;
    const audio = new Audio();
    audio.preload = "metadata";
    audio.crossOrigin = "anonymous"; // helps if covers are from other sources

    // Initialize volume from slider
    audio.volume = parseFloat(volumeSlider.value || 1);

    // ======= Utility =======
    function formatTime(seconds) {
      if (!seconds || isNaN(seconds) || !isFinite(seconds)) return "0:00";
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // ======= Queue rendering (with durations) =======
    function buildQueue() {
      queueList.innerHTML = '';
      songs.forEach((s, i) => {
        const li = document.createElement('li');
        li.className = 'queue-item';
        li.dataset.index = i;

        const img = document.createElement('img');
        img.src = s.cover;
        img.alt = s.title;

        const info = document.createElement('div');
        info.className = 'qi-info';
        const t = document.createElement('div'); t.className='title'; t.textContent = s.title || 'Unknown';
        const a = document.createElement('div'); a.className='artist'; a.textContent = s.artist || '';
        info.appendChild(t); info.appendChild(a);

        const dur = document.createElement('div');
        dur.className = 'qi-duration';
        dur.textContent = '–:–';

        li.appendChild(img);
        li.appendChild(info);
        li.appendChild(dur);

        // load metadata to get duration (do not play)
        const metaAudio = new Audio();
        metaAudio.preload = 'metadata';
        metaAudio.src = s.src;
        metaAudio.addEventListener('loadedmetadata', () => {
          dur.textContent = formatTime(metaAudio.duration);
          metaAudio.src = ""; // free
        }, { once: true });

        // click behavior
        li.addEventListener('click', () => {
          playSong(parseInt(li.dataset.index, 10));
        });

        queueList.appendChild(li);
      });
      highlightActive();
    }

    function highlightActive() {
      const items = queueList.querySelectorAll('.queue-item');
      items.forEach(it => it.classList.remove('active'));
      const active = queueList.querySelector(`.queue-item[data-index="${currentTrackIndex}"]`);
      if (active) active.classList.add('active');
    }

    // ======= Recently played (simple) =======
    // function buildRecently() {
    //   recentlyPlayed.innerHTML = '';
    //   // show last 4 songs (or all)
    //   songs.slice(0,4).forEach((s,i) => {
    //     const row = document.createElement('div');
    //     row.className = 'recent-row';
    //     const img = document.createElement('img'); img.src = s.cover;
    //     const meta = document.createElement('div');
    //     const title = document.createElement('div'); title.style.fontWeight='600'; title.textContent = s.title;
    //     const artist = document.createElement('div'); artist.style.fontSize='13px'; artist.style.color='#bcd0ea'; artist.textContent = s.artist;
    //     meta.appendChild(title); meta.appendChild(artist);
    //     row.appendChild(img); row.appendChild(meta);
    //     row.addEventListener('click', () => playSong(i));
    //     recentlyPlayed.appendChild(row);
    //   });
    // }

    // ======= Player controls =======
    function updatePlayerUI() {
      const s = songs[currentTrackIndex];
      playerTitle.textContent = s.title || 'Unknown';
      playerArtist.textContent = s.artist || '';
      playerCover.src = s.cover;
      lyricsEl.textContent = s.lyrics || 'Lyrics not available.';
      highlightActive();
    }

    function playSong(index) {
      if (index < 0 || index >= songs.length) return;
      currentTrackIndex = index;
      const s = songs[currentTrackIndex];
      audio.src = s.src;
      audio.currentTime = 0;
      audio.play().catch(()=>{}); // autoplay might be blocked until user gesture
      isPlaying = true;
      playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      updatePlayerUI();
    }

    function togglePlay() {
      if (audio.src === "" ) {
        // load current
        audio.src = songs[currentTrackIndex].src;
      }
      if (audio.paused) {
        audio.play().catch(()=>{});
        isPlaying = true;
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      } else {
        audio.pause();
        isPlaying = false;
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      }
    }

    function nextTrack() {
      if (isShuffle) {
        currentTrackIndex = Math.floor(Math.random() * songs.length);
      } else {
        currentTrackIndex = (currentTrackIndex + 1) % songs.length;
      }
      playSong(currentTrackIndex);
    }

    function prevTrack() {
      if (isShuffle) {
        currentTrackIndex = Math.floor(Math.random() * songs.length);
      } else {
        currentTrackIndex = (currentTrackIndex - 1 + songs.length) % songs.length;
      }
      playSong(currentTrackIndex);
    }

    // ======= Events =======
    // Time update -> progress
    audio.addEventListener('timeupdate', () => {
      if (!audio.duration || isNaN(audio.duration)) return;
      const pct = (audio.currentTime / audio.duration) * 100;
      progressBar.style.width = pct + '%';
      currentTimeEl.textContent = formatTime(audio.currentTime);
    });

    // metadata -> total duration
    audio.addEventListener('loadedmetadata', () => {
      totalDurationEl.textContent = formatTime(audio.duration);
    });

    // ended
    audio.addEventListener('ended', () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play().catch(()=>{});
      } else {
        nextTrack();
      }
    });

    // progress seeking
    progressContainer.addEventListener('click', (e) => {
      if (!audio.duration || isNaN(audio.duration)) return;
      const rect = progressContainer.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newTime = (clickX / width) * audio.duration;
      audio.currentTime = newTime;
    });

    // volume
    volumeSlider.addEventListener('input', () => {
      audio.volume = parseFloat(volumeSlider.value);
    });

    // buttons
    playBtn.addEventListener('click', togglePlay);
    nextBtn.addEventListener('click', nextTrack);
    prevBtn.addEventListener('click', prevTrack);

    shuffleBtn.addEventListener('click', () => {
      isShuffle = !isShuffle;
      shuffleBtn.style.opacity = isShuffle ? '1' : '.6';
    });

    repeatBtn.addEventListener('click', () => {
      isRepeat = !isRepeat;
      repeatBtn.style.opacity = isRepeat ? '1' : '.6';
    });

    // keyboard space toggles play/pause (only when focused on body)
    document.body.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      }
    });

    // ======= Init =======
    function init() {
      buildQueue();
      buildRecently();
      audio.src = songs[currentTrackIndex].src;
      updatePlayerUI();
      // set/refresh durations for queue if loaded later
    }

    init();

  