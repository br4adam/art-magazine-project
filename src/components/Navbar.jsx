import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import LoginModal from "./LoginModal"
import logo from '../assets/logo.png'

const Navbar = ({ searchValue, setSearchValue, setSearchResult, setIsLoading, isLoading, isLoggedIn, setIsLoggedIn, artworkCount }) => {
  const [ showLogin, setShowLogin ] = useState(false)
  const navigate = useNavigate()

  const searchSubmit = (e) => {
    if (e.key === "Enter") {
      setIsLoading(true)
      const fetchData = async () => {
        try {
          const response = await fetch(`https://api.artic.edu/api/v1/artworks/search?page=1&limit=100&q=${searchValue}&fields=id,title,image_id`)
          const data = await response.json()
          setSearchResult(data.data)
        } catch (error) {
          console.log(error)
        } finally {
          setIsLoading(false)
        }
      }
      fetchData()
      navigate('/search')
    }
  }

  const showLoginBox = () => {
    setShowLogin(!showLogin)
  }

  const closeLoginBox = () => {
    showLogin && setShowLogin(false)
  }

  const handleLogoClick = () => {
    navigate('/')
    window.scrollTo(0,0)
  }

  return (
    <nav>
      <div>
        <Link to="/">
          <img id="logo" src={logo} onClick={handleLogoClick}/>
        </Link>
      </div>
      <input 
        type="text" 
        placeholder="Search" 
        value={searchValue} 
        onKeyDown={searchSubmit}
        onChange={(e) => setSearchValue(e.target.value)}/> 
      <LoginModal 
        closeLoginBox={closeLoginBox} 
        showLoginBox={showLoginBox} 
        showLogin={showLogin} 
        setShowLogin={setShowLogin}
        setIsLoading={setIsLoading} 
        isLoading={isLoading} 
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        artworkCount={artworkCount}
      />
    </nav>
  )
}

export default Navbar