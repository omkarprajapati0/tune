export default function Help(){
  const toggle = (e) => {
    const p = e.currentTarget.nextElementSibling
    p.style.display = p.style.display === 'block' ? 'none' : 'block'
  }
  return (
    <div className="container" style={{maxWidth:1000, margin:'8px auto', padding:20, background:'#ffffffda', borderRadius:8}}>
      <header style={{textAlign:'center', borderBottom:'1px solid #ddd', padding:20}}>
        <h1>Help Center</h1>
        <p>Find answers to common questions and get support.</p>
      </header>
      <div className="faq" style={{margin:'20px 0'}}>
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3 onClick={toggle} style={{cursor:'pointer', background:'#f1f1f1', padding:10, borderRadius:4}}>How do I play a song?</h3>
          <p style={{display:'none', background:'#fafafa', padding:10}}>Find your favorite song and click on the track. It will start playing in the player.</p>
        </div>
        <div className="faq-item">
          <h3 onClick={toggle} style={{cursor:'pointer', background:'#f1f1f1', padding:10, borderRadius:4}}>How do I find songs categories?</h3>
          <p style={{display:'none', background:'#fafafa', padding:10}}>Go to the Homepage menu. You will find Song Categories.</p>
        </div>
        <div className="faq-item">
          <h3 onClick={toggle} style={{cursor:'pointer', background:'#f1f1f1', padding:10, borderRadius:4}}>Why can’t I see lyrics?</h3>
          <p style={{display:'none', background:'#fafafa', padding:10}}>Lyrics are available only for certain songs.</p>
        </div>
      </div>
      <div className="contact" style={{padding:20, background:'#f0f0f0', borderRadius:6}}>
        <h2>Still Need Help?</h2>
        <p>Email: <a href="mailto:support@tunewavemusic.com">support@tunewavemusic.com</a></p>
        <p>GitHub Issues: <a href="https://github.com/omkarprajapati0/tune">Report a bug / request feature</a></p>
      </div>
    </div>
  )
}
