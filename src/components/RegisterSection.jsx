import { useState, useEffect } from "react"

const RegisterSection = ({ isLoading, setIsLoading, setShowLoginSection }) => {
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ confirmPassword, setConfirmPassword ] = useState("")
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ successMessage, setSuccessMessage ] = useState(null)
  
  const sendRegister = async () => {
  if (errorMessage) return
  setIsLoading(true)
  try {
    const response = await fetch("http://18.195.136.196:8080/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
    console.log("Status code: ", response.status)
    if (response.ok) {
      setSuccessMessage("Registration success! You can now login.")
      setTimeout(() => {
        setShowLoginSection(true)
      }, 2500)
    } 
    response.status === 409 && setErrorMessage(`Email '${email}' is already taken.`)
  } catch (error) {
    console.log(error.response)
    setErrorMessage("Registration failed!")
  } finally {
    setIsLoading(false)
  }
}

  useEffect(() => {
    checkValidation()
  }, [email, password, confirmPassword])

  const checkValidation = () => {
    if (email.length === 0) setErrorMessage("Please type you email address.")
    else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) setErrorMessage("Not a valid email address.")
    else if (password !== confirmPassword) setErrorMessage("Passwords do not match.")
    else if (password.length > 0 && password.length < 6) setErrorMessage("Your password must be have at least 6 characters.")
    else setErrorMessage(null)
  }

  return (
    <section className="register-section fade-in">
      <label>Email address</label>
      <input type="email" value={email} placeholder="name@email.com"
        onChange={(e) => setEmail(e.target.value)} />
      <label>Password</label>
      <input type="password" value={password} placeholder="********"
        onChange={(e) => setPassword(e.target.value)} />
      <label>Password again</label>
      <input type="password" value={confirmPassword} placeholder="********"
        onChange={(e) => setConfirmPassword(e.target.value)} />
      <div className="notification">
        <p>{ isLoading && "Loading..." }</p>
        <p className="notification-error">{ errorMessage }</p>
        <p className="notification-success">{ successMessage }</p>
      </div>
      <button onClick={sendRegister}>Register</button>
    </section>
  )
}

export default RegisterSection