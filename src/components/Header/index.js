import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import './style.css'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../actions'
import { changeNameAction } from '../../actions'
/**
 * @author
 * @function Header
 **/

const Header = (props) => {
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [changeName, setChangeName] = useState(false)
  const [firstName, setFirstName] = useState(auth.firstName)
  const [lastName, setLastName] = useState(auth.lastName)

  return (
    <header className="header">
      <div style={{ display: 'flex' }}>
        <div className="logo">InTime</div>
        {!auth.authenticated ? (
          <ul className="leftMenu">
            <li>
              <NavLink to={'/login'}>Login</NavLink>
            </li>
            <li>
              <NavLink to={'/register'}>Sign up</NavLink>
            </li>
          </ul>
        ) : null}
      </div>
      <div
        style={{ margin: '20px 0', color: '#fff', fontWeight: 'bold' }}
        onClick={() => {
          setChangeName(true)
        }}
      >
        {auth.authenticated ? `Hi ${auth.firstName} ${auth.lastName}` : ''}
      </div>
      {/* the form to change name */}
      {changeName ? (
        <form className="profile-form">
          <h1>Profile</h1>
          <span className="close-btn" onClick={() => setChangeName(false)}>
            x
          </span>
          <div className="form-input-material">
            <input
              type="text"
              name="username"
              id="username"
              placeholder={firstName}
              autoComplete="off"
              className="form-control-material"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-input-material">
            <input
              type="text"
              name="password"
              id="password"
              placeholder={lastName}
              // autoComplete="off"
              onChange={(e) => setLastName(e.target.value)}
              className="form-control-material"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-ghost"
            onClick={() => {
              dispatch(
                changeNameAction(auth.uid, firstName, lastName, auth.email),
              )
              setChangeName(false)
            }}
          >
            Submit
          </button>
        </form>
      ) : null}

      {auth.authenticated ? (
        <ul className="menu">
          <li>
            <Link
              to={'#'}
              onClick={() => {
                dispatch(logout(auth.uid))
              }}
            >
              Logout
            </Link>
          </li>
        </ul>
      ) : null}
    </header>
  )
}

export default Header
