import React, { useState, useRef } from 'react'
import {useAuth} from '../../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
// import s from './Signup.module.css'
import './signup.scss'

export default function SignUp() {
  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()


  const nameRef = useRef()
  const emailRef = useRef()
  const phoneRef = useRef()
  const passwordRef = useRef()
  const password2Ref = useRef()



  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== password2Ref.current.value) {
      return setError('Passwords do not match')
    }
    try {
      setError('')
      setLoading(true)
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        nameRef.current.value,
        phoneRef.current.value)
      history.push('/dashboard')
    }
    catch {
      setError('Failed to create an account')
    }
    setLoading(false)
  }


  return (
    <div className='page'>
      <div className='wrapper'>
        <div className="h1">Регистрация</div>
        {error && <div>{error}</div>}
        <form className="form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              ref={nameRef}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              ref={emailRef}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              placeholder="Phone Number"
              name="phone"
              ref={phoneRef}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              ref={passwordRef}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              ref={password2Ref}
              required
            />
          </div>
          <input type="submit" disabled={loading} className="submitBtn" value="Регистрация" />
        </form>



      <div className="confirmation">Уже есть аккаунт? <Link to='/login'>Войти</Link></div>
      </div>
    </div>
  )
}
