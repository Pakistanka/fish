import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {

  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
    }

    setLoading(false)
  }

  return (
    <div>
      <h2 className="text-center mb-4">Password Reset</h2>
      {error && <div>{error}</div>}
      {message && <div>{message}</div>}
      <form 
        className=""
        onSubmit={handleSubmit}
      >
        
        <div className="">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            ref={emailRef}
            required
          />
        </div>


        <button disabled={loading} className="" type="submit">
          Reset Password
        </button>
      </form>


      <div className="">
        <Link to="/login">Login</Link>
      </div>

      <div className="">
        Want a new account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  )
}
