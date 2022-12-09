import { useState } from "react"

const LoginSection = ({ isLoading, setIsLoading, closeLoginBox, setIsLoggedIn }) => {
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ successMessage, setSuccessMessage ] = useState(null)

  const sendLogin = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("http://18.195.136.196:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()
      localStorage.setItem("accessToken",data.accessToken)
      if (response.ok) {
        setSuccessMessage("Login successful")
        localStorage.setItem("userName", email)
        setTimeout(() => {
          setIsLoggedIn(prev=>!prev)
          closeLoginBox()
        }, 1000)
      } 
      else setErrorMessage("Wrong email or password.")
    } catch (error) {
      console.error(error)
      setErrorMessage("Login failed!")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="login-section fade-in">
      <label>Email address</label>
      <input type="email" placeholder="name@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Password</label>
      <input type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />
      <div className="notification">
        <p>{ isLoading && "Loading..." }</p>
        <p className="notification-error">{ errorMessage }</p>
        <p className="notification-success">{ successMessage }</p>
      </div>
      <button onClick={sendLogin}>Login</button>
    </section>
  )
}

export default LoginSection