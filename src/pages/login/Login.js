import React, { useState, useRef } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import './login.scss'

export default function Login() {
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()


  const emailRef = useRef()
  const passwordRef = useRef()


  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push('/orders')
    }
    catch {
      setError('Failed to log in')
    }
    setLoading(false)
  }


  return (
    <div className="login">
      <div className="wrapper">
        <div className="form_text">У вас уже есть аккаунт?<br/>Введите данные чтобы войти:</div>
        {error && <div>{error}</div>}
        <form className="form"
          onSubmit={handleSubmit}
        >
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
              type="password"
              placeholder="Password"
              name="password"
              ref={passwordRef}
              required
            />
          </div>

          <input type="submit" disabled={loading} className="submitBtn" value="Войти" />
        </form>
      </div>
      <div className="">
        <Link to="/signup">Зарегистрироваться</Link>
      </div>
      <Link to='/forgot-password'>Забыли пароль?</Link>
    </div>
  )
}

