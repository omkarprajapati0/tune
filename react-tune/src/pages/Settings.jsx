export default function Settings(){
  const onSave = () => alert('Settings saved! (stored locally for demo)')
  return (
    <div className="container" style={{maxWidth:800, margin:'8px auto', padding:20, background:'#ffffffd7', borderRadius:8}}>
      <header style={{textAlign:'center', borderBottom:'1px solid #ddd', padding:20}}>
        <h1>Settings</h1>
        <p>Customize your experience</p>
      </header>
      <div className="section" style={{padding:20}}>
        <h2>Preferences</h2>
        <div className="field">
          <label htmlFor="theme">Theme</label>
          <select id="theme"><option value="light">Light</option><option value="dark">Dark</option></select>
        </div>
        <div className="field"><input type="checkbox" id="notifications" /> <label htmlFor="notifications">Enable Notifications</label></div>
        <div className="field"><input type="checkbox" id="auto_play" /> <label htmlFor="auto_play">Auto-play Next Track</label></div>
      </div>
      <div className="section" style={{padding:20}}>
        <h2>Playback Settings</h2>
        <div className="field">
          <label htmlFor="crossfade">Crossfade Duration (seconds)</label>
          <input id="crossfade" type="text" placeholder="e.g. 5" />
        </div>
        <div className="field">
          <input type="checkbox" id="shuffle" /> <label htmlFor="shuffle">Shuffle Playlist</label>
        </div>
      </div>
      <div className="actions" style={{textAlign:'center', padding:20}}>
        <button onClick={onSave} style={{padding:'10px 24px', background:'#007BFF', color:'#fff', border:'none', borderRadius:4}}>Save Settings</button>
      </div>
    </div>
  )
}
