import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { database } from '../../firebase'
import cartUrl from './../../assets/images/cart-64_white.png'
import logo from '../../assets/images/cory.png'
import userUrl from '../../assets/images/user.svg'
import { gsap } from 'gsap'

import './nav.scss'


function Navigation() {
  const {
    logout,
    currentUser,
    totalNumber,
    getProfile,
    userInfo  } = useAuth()
  const history = useHistory()
  const [error, setError] = useState("")
  const [showNav, setShowNav] = useState(false)


  useEffect(() => {
    if(currentUser){
      getProfile();
    }
  }, [database])

  useEffect(() => {
    var tl = gsap.timeline({repeat: -1});
    tl.to("#logo-cory", 2, {x: 10, scale: .95, skewY: 5, skewX: 10, rotateY: 10})
      .to("#logo-cory", 2,{x: 0, scale: 1, skewY: -5, skewX: 0, rotateY: 0 })
      .to("#logo-cory", 2,{x: 0, scale: 1, skewY: 0 })
  }, []);


  async function handleLogout() {
    setError("")
    try {
      await logout()
      history.push("/")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <div className="nav">
      <div className="wrapper">
        <Link to="/">
          {/* <div>Coryphaena</div>
           */}
           <img src={logo} id="logo-cory" alt="Coryphaena" />
        </Link>

        {currentUser ?
          <>
          <div className="menuItems">
            {userInfo && userInfo.user_role === "admin" &&
              <Link to="/additem" className="navItem add-to-catalog">
                + Товар
              </Link>
            }
            <Link to="/cart" className="navItem cart-pic">
              {/* Корзина */}
              <div className="menu__basket">
                <img src={cartUrl} alt="Корзина" />
                <span>{totalNumber}</span>
              </div>
            </Link>
            <div onClick={() => setShowNav(!showNav)} className="menuIcon">
            <img src={userUrl} alt="" />
              {/* {currentUser.email}
              <img src={arrowUrl} alt="" /> */}
            </div>
            {showNav ?
              <div className="dMenuItems" onClick={() => setShowNav(false)}>
                <Link to="/profile" className="menuItem">
                  Profile
                </Link>
                <Link to="/notifications" className="menuItem">
                  Notifications
                </Link>
                <Link to="/wallet" className="menuItem">
                  Wallet
                </Link>
                <Link to="/orders" className="menuItem">
                  Orders
                </Link>
                <Link to='' className="menuItem" onClick={handleLogout}>
                  Log Out
                </Link>
                {error && <div>{error}</div>}
              </div>

              :
            null}
            </div>
          </>
          :
          <div className="menuItems">
            <Link to="/cart" className="navItem cart-pic">
              {/* Корзина */}
              <div className="menu__basket">
                <img src={cartUrl} alt="Корзина" />
                <span>{totalNumber}</span>
              </div>
            </Link>
            {/* <Link to="/socialmedia" className="navItem">
              Сети
            </Link> */}
            <Link to='/login' className="navItem">
              Войти
            </Link>
          </div>
        }
      </div>
    </div>
  )
}

export default Navigation
