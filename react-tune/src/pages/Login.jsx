import './login.css'

export default function Login(){
  const onSubmit = (e) => {
    e.preventDefault()
    const password = new FormData(e.currentTarget).get('password')
    if (password === 'music123') {
      window.location.href = '/all-songs'
    } else {
      alert('Incorrect password. Please try again.')
    }
  }
  return (
    <div className="container login">
      <div className="left">
        <h2>Welcome to</h2>
        <h1>“MUSIC WEB”</h1>
        <img src="https://cdn-icons-gif.flaticon.com/6569/6569164.gif" height="160" style={{borderRadius: '20%'}} />
      </div>
      <div className="right">
        <h2>Create your account</h2>
        <form onSubmit={onSubmit}>
          <label htmlFor="name">Name</label>
          <input name="name" id="name" type="text" placeholder="Enter your name" />
          <label htmlFor="email">E-mail Address</label>
          <input name="email" id="email" type="email" placeholder="Enter your mail" required />
          <label htmlFor="password">Password</label>
          <input name="password" id="password" type="password" placeholder="Enter your password" required />
          <div className="checkbox">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">By Signing Up I agree with <a href="/terms" onClick={(e)=>e.preventDefault()}>Terms & Conditions</a></label>
          </div>
          <button type="submit" className="btn-signup">Sign In</button>
        </form>
      </div>
    </div>
  )
}
