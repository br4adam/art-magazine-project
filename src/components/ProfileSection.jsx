import { Link, useNavigate } from 'react-router-dom'

const ProfileSection = ({ setIsLoggedIn, setShowLogin, userName, artworkCount }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem("accessToken")
    localStorage.removeItem("userName")
    navigate("/")
  }

  return (
    <>
      <h3>Hello, {userName && userName.split("@")[0]}!</h3>
      <section className="profile-section fade-in">
        <div>
          <div className="profile-picture">
            <h4>{userName && userName.slice(0,1).toUpperCase()}</h4>
          </div>
          <p>You have {artworkCount} saved artworks.</p>
        </div>
        <Link to="/saved" onClick={() => setShowLogin(false)}>
          <p>My artworks</p>
        </Link>
        <Link to="/artworks" onClick={() => setShowLogin(false)}>
          <p>Browse gallery</p>
        </Link>
        <button onClick={handleLogout}>Logout</button>
      </section>
    </>
  )
}

export default ProfileSection