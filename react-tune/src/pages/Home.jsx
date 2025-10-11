import './home.css'

export default function Home() {
  return (
    <div className="container" style={{ width: '100%' }}>
      <section className="hero">
        <div className="hero-text">
          <div className="logo"><img src="/images-&-gifs/Logo-img.png" height="45" /></div>
          <h1>Enjoy Music Without</h1>
          <h2>Limits</h2>
          <div className="hero-image"></div>
          <p>Say, Goodbye to interruptions and enjoy uninterrupted music streaming. <br/>With our ad-free platform, you'll have access to lots of songs.</p>
          <a href="/" className="btn-start" onClick={(e)=>{e.preventDefault(); window.location.href='/all-songs';}}>Start Listening</a>
          <a href="/login" className="btn-signin">Sign In</a>
        </div>
        <div className="hero-image"></div>
      </section>
    </div>
  )
}
