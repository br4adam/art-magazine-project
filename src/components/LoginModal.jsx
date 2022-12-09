import { useState } from 'react'
import { useDetectClickOutside } from 'react-detect-click-outside'
import LoginSection from './LoginSection'
import RegisterSection from './RegisterSection'
import ProfileSection from './ProfileSection'

const LoginModal = ({ closeLoginBox, showLoginBox, showLogin, isLoading, setIsLoading, isLoggedIn, setIsLoggedIn, setShowLogin, artworkCount }) => {
  const ref = useDetectClickOutside({ onTriggered: closeLoginBox })
  const [ showLoginSection, setShowLoginSection ] = useState(true)

  const userName = localStorage.getItem("userName")

  return (
    <div ref={ref}>
      { !isLoggedIn 
        ? <a onClick={showLoginBox}>Login</a> 
        : <div className='profile-picture' onClick={showLoginBox}>
            <h4>{userName.slice(0,1).toUpperCase()}</h4>
          </div> 
      }
      { showLogin && 
      <div id="login">
        { isLoggedIn ? <ProfileSection setIsLoggedIn={setIsLoggedIn} setShowLogin={setShowLogin} userName={userName} artworkCount={artworkCount} /> :
        <>
        <div className="login-headers">
          <h3 onClick={() => setShowLoginSection(true)} className={!showLoginSection ? "disabled" : ""}>Login</h3>
          <h3 onClick={() => setShowLoginSection(false)} className={showLoginSection ? "disabled" : ""}>Register</h3>
        </div>
        { showLoginSection 
          ? <LoginSection isLoading={isLoading} setIsLoading={setIsLoading} closeLoginBox={closeLoginBox} setIsLoggedIn={setIsLoggedIn} />
          : <RegisterSection isLoading={isLoading} setIsLoading={setIsLoading} setShowLoginSection={setShowLoginSection} />
        }
        </>
      }
      </div>
      }
    </div>
  )
}

export default LoginModal