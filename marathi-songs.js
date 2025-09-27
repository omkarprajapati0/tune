
    // ======= Data =========
    const songs = [
      { title: "Chandra",      artist: "Shreya Ghoshal",          src: "./ALL-songs/chandra.mp3",  cover: "https://a10.gaanacdn.com/gn_img/albums/9En3peWXDV/n3pq1RlPWX/size_l.jpg", lyrics: `Lyrics not available.` },
      { title: "Zingaat",      artist: "Ajay Gogavale",          src: "./ALL-songs/Zingaat.mp3",  cover: "https://www.ilyricshub.com/wp-content/uploads/2016/03/zingaat-sairat.jpg", lyrics: `Lyrics not available.` } , 
      { title: "Lallati Bhandar",  artist: " Ajay-Atul and Ajay Gogavale",          src: "./ALL-songs/Lallati-Bhandar.mp3",  cover: "https://c.saavncdn.com/750/Jogwa-Original-Motion-Picture-Soundtrack-Marathi-2013-20240922184409-500x500.jpg", lyrics: `Lyrics not available.` } ,
      { title: "Dolby walya",      artist: "Nagesh Morwekar",          src: "./ALL-songs/Dolby-walya.mp3",  cover: "https://tse1.mm.bing.net/th/id/OIP.Pr3vLoOUTZ9dTp9hEVrLPgAAAA?rs=1&pid=ImgDetMain&o=7&rm=3", lyrics: `Lyrics not available.` },
      { title: "kadhi tu",      artist: "Hrishikesh Ranade",          src: "./ALL-songs/kadhi-tu.mp3",  cover: "https://tse1.mm.bing.net/th/id/OIP.VRQaXRUJi_z6uKHKhovlsgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3", lyrics: `Lyrics not available.` },
      { title: "Tik Tik vajate dokyat",      artist: "Sonu Nigam, Sayali Pankaj",          src: "./ALL-songs/Tik-Tik-vajate-dokyat.mp3",  cover: "https://i.ytimg.com/vi/_lP8qU5IQxY/maxresdefault.jpg", lyrics: `Lyrics not available.` } , 
      { title: "Taambdi Chaamdi",      artist: " Shreyas",          src: "./ALL-songs/Taambdi-Chaamdi.mp3",  cover: "https://i.ytimg.com/vi/hMjnaLRrxcg/hqdefault.jpg", lyrics: `Lyrics not available.` },
    //   { title: "",      artist: "",          src: "./ALL-songs/.mp3",  cover: "", lyrics: `Lyrics not available.` } ,
    //   { title: "",      artist: "",          src: "./ALL-songs/.mp3",  cover: "", lyrics: `Lyrics not available.` },
    //   { title: "",      artist: "",          src: "./ALL-songs/.mp3",  cover: "", lyrics: `Lyrics not available.` } ,
    //   { title: "",      artist: "",          src: "./ALL-songs/.mp3",  cover: "", lyrics: `Lyrics not available.` }
  
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

  