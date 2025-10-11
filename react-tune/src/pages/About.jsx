export default function About(){
  return (
    <div className="container" style={{maxWidth:1000, margin:'8px auto', padding:20, background:'#ffffffcd', boxShadow:'2px 2px 20px 25px rgba(0,0,0,0.838)', borderRadius:8}}>
      <header style={{textAlign:'center', padding:20, borderBottom:'1px solid #ddd'}}>
        <h1>About-Us</h1>
        <p>Your personal music hub — listen, explore, enjoy.</p>
      </header>
      <section style={{padding:20}}>
        <h2>Our Mission</h2>
        <p>At TuneWave, our goal is to bring you a seamless and intuitive music experience.</p>
        <h2>What We Offer</h2>
        <p>• A curated library of songs, albums, artists, and genres.<br/>• Recently played & Now Playing features.<br/>• Lyrics view (where available).<br/>• A clean, minimal UI designed for quick navigation.</p>
        <h2>Meet the Team</h2>
        <div style={{display:'flex', gap:20, flexWrap:'wrap'}}>
          <div style={{flex:'1 1 200px', textAlign:'center'}}>
            <img src="/photo-1511379938547-c1f69419868d.avif" alt=" Parth Patil" style={{width:160, height:160, borderRadius:'50%', objectFit:'cover'}}/>
            <h3>Parth Patil</h3>
            <p>Founder and co-designer</p>
          </div>
          <div style={{flex:'1 1 200px', textAlign:'center'}}>
            <img src="/images-&-gifs/omkar's img.png" alt="Omkar Prajapati" style={{width:160, height:160, borderRadius:'50%', objectFit:'cover'}}/>
            <h3>Omkar Prajapati</h3>
            <p>Developer & Designer</p>
          </div>
        </div>
        <h2>Why “TuneWave”?</h2>
        <p>We believe music is a universal language. The name reflects harmony and rhythm.</p>
        <h2>Get in Touch</h2>
        <p>Email: <a href="mailto:hello@tunewavemusic.com">hello@tunewavemusic.com</a></p>
        <p>GitHub: <a href="https://github.com/omkarprajapati0/tune">github.com/omkarprajapati0/tune</a></p>
      </section>
    </div>
  )
}
