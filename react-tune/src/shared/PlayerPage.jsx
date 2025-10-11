import { useEffect, useMemo, useRef, useState } from 'react'
import './player.css'

export default function PlayerPage({ title, songs }){
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isShuffle, setShuffle] = useState(false)
  const [isRepeat, setRepeat] = useState(false)
  const [isPlaying, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef(null)

  const current = songs[currentTrackIndex] || {}

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.src = current?.src || ''
    if (isPlaying) {
      audioRef.current.play().catch(()=>{})
    } else {
      // do not autoplay when switching unless already playing
    }
  }, [currentTrackIndex])

  useEffect(() => {
    if (!audioRef.current) return
    if (isPlaying) audioRef.current.play().catch(()=>{})
    else audioRef.current.pause()
  }, [isPlaying])

  const onTimeUpdate = () => {
    if (!audioRef.current?.duration) return
    setCurrentTime(audioRef.current.currentTime)
  }

  const formatTime = (sec) => {
    if (!sec || !isFinite(sec)) return '0:00'
    const m = Math.floor(sec / 60)
    const s = Math.floor(sec % 60)
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  const nextTrack = () => {
    if (isShuffle) {
      setCurrentTrackIndex(Math.floor(Math.random() * songs.length))
    } else {
      setCurrentTrackIndex((i) => (i + 1) % songs.length)
    }
    setPlaying(true)
  }

  const prevTrack = () => {
    if (isShuffle) {
      setCurrentTrackIndex(Math.floor(Math.random() * songs.length))
    } else {
      setCurrentTrackIndex((i) => (i - 1 + songs.length) % songs.length)
    }
    setPlaying(true)
  }

  const onEnded = () => {
    if (isRepeat && audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(()=>{})
    } else {
      nextTrack()
    }
  }

  const onProgressClick = (e) => {
    const bar = e.currentTarget
    const rect = bar.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    if (audioRef.current?.duration) {
      audioRef.current.currentTime = pct * audioRef.current.duration
    }
  }

  const pct = audioRef.current?.duration ? (currentTime / audioRef.current.duration) * 100 : 0

  return (
    <main className="wrap">
      <div className="left">
        <div className="panel">
          <h3>{title}</h3>
          <ul className="queue-list" aria-label="Queue">
            {songs.map((s, i) => (
              <li key={s.title + i} className={`queue-item ${i===currentTrackIndex?'active':''}`} onClick={() => { setCurrentTrackIndex(i); setPlaying(true) }}>
                <img src={s.cover} alt={s.title} />
                <div className="qi-info">
                  <div className="title">{s.title}</div>
                  <div className="artist">{s.artist}</div>
                </div>
                <div className="qi-duration">{/* duration is resolved on demand */}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="right">
        <div className="player" role="region" aria-label="Now playing">
          <div className="player-left">
            <img className="player-cover" src={current.cover} alt="cover" />
            <div className="meta">
              <div className="title player-title">{current.title}</div>
              <div className="artist player-artist">{current.artist}</div>
            </div>
          </div>

          <div className="controls" aria-hidden="false">
            <div className="player-buttons">
              <button id="prev" title="Previous" onClick={prevTrack}><i className="fa-solid fa-backward-step"></i></button>
              <button id="play" className="play-btn" title="Play/Pause" onClick={() => setPlaying(p => !p)}>
                <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
              </button>
              <button id="next" title="Next" onClick={nextTrack}><i className="fa-solid fa-forward-step"></i></button>
              <button id="shuffle" title="Shuffle" style={{opacity:isShuffle?1:.6}} onClick={()=>setShuffle(s=>!s)}><i className="fa-solid fa-shuffle"></i></button>
              <button id="repeat" title="Repeat" style={{opacity:isRepeat?1:.6}} onClick={()=>setRepeat(r=>!r)}><i className="fa-solid fa-repeat"></i></button>
            </div>
            <div className="progress-row" style={{width:'100%'}}>
              <div className="time"><span id="current-time">{formatTime(currentTime)}</span></div>
              <div className="progress-container" onClick={onProgressClick}>
                <div className="progress-bar" style={{ width: `${pct}%` }}></div>
              </div>
              <div className="time"><span id="total-duration">{formatTime(audioRef.current?.duration||0)}</span></div>
            </div>
          </div>

          <div className="player-right">
            <div className="vol-wrap">
              <i className="fa-solid fa-volume-low"></i>
              <input type="range" className="volume-slider" min="0" max="1" step="0.01" defaultValue={1} onInput={(e)=>{ if(audioRef.current) audioRef.current.volume = parseFloat(e.currentTarget.value) }} />
            </div>
          </div>
        </div>

        <div id="lyrics-panel" className="panel" aria-live="polite">
          <h3 style={{marginBottom:8}}>Lyrics</h3>
          <div id="lyrics">{current.lyrics || 'Lyrics not available.'}</div>
        </div>
      </div>

      <audio ref={audioRef} onTimeUpdate={onTimeUpdate} onEnded={onEnded} preload="metadata" crossOrigin="anonymous" />
    </main>
  )
}
