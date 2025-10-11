export default function Account(){
  const onSave = () => {
    alert('Account details updated! (stored locally for demo)')
  }
  return (
    <div className="container" style={{maxWidth:800, margin:'8px auto', padding:20, background:'#ffffffd1', borderRadius:8}}>
      <header style={{textAlign:'center', borderBottom:'1px solid #ddd', padding:20}}>
        <h1>Your Account</h1>
        <p>Manage your account settings</p>
      </header>
      <div className="content" style={{padding:20}}>
        <div className="profile-pic" style={{textAlign:'center', marginBottom:20}}>
          <img id="profileImage" src="https://via.placeholder.com/120" alt="Profile" style={{width:120,height:120,borderRadius:'50%',objectFit:'cover',border:'2px solid #ddd'}}/>
        </div>
        <div className="field">
          <label htmlFor="fullname">Full Name</label>
          <input type="text" id="fullname" placeholder="Your full name" />
        </div>
        <div className="field">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" placeholder="you@example.com" />
        </div>
        <div className="field">
          <label htmlFor="newPassword">New Password</label>
          <input type="password" id="newPassword" placeholder="••••••••" />
        </div>
        <div className="actions" style={{textAlign:'center', marginTop:30}}>
          <button onClick={onSave} style={{padding:'10px 24px', background:'#007BFF', color:'#fff', border:'none', borderRadius:4}}>Save Changes</button>
        </div>
      </div>
    </div>
  )
}
