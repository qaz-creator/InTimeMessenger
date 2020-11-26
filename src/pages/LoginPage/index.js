import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { isLoggedInUser, signin } from '../../actions'
import Layout from '../../components/Layout'
import Card from '../../components/UI/Card'
import './style.css'
/**
 * @author
 * @function LoginPage
 **/

const LoginPage = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const auth = useSelector((state) => state.auth)

  // dispatch to action
  const dispatch = useDispatch()
  const userLogin = (e) => {
    e.preventDefault()
    if (email == '') {
      alert('Email is required')
      return
    }
    if (password == '') {
      alert('Password is required')
      return
    }

    dispatch(signin(email, password))
  }

  // direct to home page if logged in
  if (auth.authenticated) {
    return <Redirect to="/" />
  }

  return (
    <Layout>
      {/* <div className="loginContainer"> */}
      {/* <Card> */}
      <form onSubmit={userLogin} className="login">
        <h1>Sign In</h1>

        <input
          name="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <div>
          <button>Login</button>
        </div>
      </form>
      {/* </Card> */}
      {/* </div> */}
    </Layout>
  )
}

export default LoginPage
