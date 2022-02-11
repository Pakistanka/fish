import React, { useRef, useState, useEffect } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { database } from '../../../firebase'
import './update-profile.scss'

export default function UpdateProfile() {
  const firstNameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const {
    currentUser,
    updatePassword,
    updateEmail,
    userInfo,
    getProfile } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()





  const [user, setUser] = useState({
    firstname: "",
    email: "",
    phone: "",
    user_role: ""
  });


  useEffect(() => {
    setUser({
      ...user,
      firstname: userInfo.firstname,
      email: userInfo.email,
      phone: userInfo.phone,
      user_role: userInfo.user_role });
  }, [userInfo])


  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/dashboard")
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }


  return (
    <div className="page">
      <div className="wrapper">
      <div>
        <h2 className="text-center mb-4">Hi, {user.firstname}</h2>
        <div><strong>Phone:</strong> {user.phone}</div>
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>Role:</strong> {user.user_role}</div>
      </div>
        {error && <div>{error}</div>}
        <form className="form"
          onSubmit={handleSubmit}
        >
          <label className="form-group">
            <input
              type="text"
              placeholder="Name"
              ref={firstNameRef}
              required
              defaultValue={user.firstname}
            />
          </label>
          <label className="form-group">
            <input
              type="email"
              ref={emailRef}
              required
              defaultValue={currentUser.email}
            />
          </label>
          <label className="form-group">
            <input
              type="password"
              ref={passwordRef}
              placeholder="Leave blank to keep the same"
            />
          </label>
          <label className="form-group">
            <input
              type="password"
              ref={passwordConfirmRef}
              placeholder="Leave blank to keep the same"
            />
          </label>
          <input type="submit" disabled={loading} className="submitBtn" value="Update Account" />
        </form>
      </div>

      <div className="confirmation">
        <Link to="/dashboard">Cancel</Link>
      </div>
    </div>
  )
}
