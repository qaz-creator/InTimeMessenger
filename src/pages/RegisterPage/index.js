import React, { useState } from 'react'
import Layout from '../../components/Layout'
import '../LoginPage/style.css'
import Card from '../../components/UI/Card'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../../actions'
import { Redirect } from 'react-router-dom'
/**
 * @author
 * @function RegisterPage
 **/

const RegisterPage = (props) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // dispatch action
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  //  * submit
  const registerUser = (e) => {
    e.preventDefault()
    const user = {
      firstName,
      lastName,
      email,
      password,
    }
    dispatch(signup(user))
  }
  if (auth.authenticated) {
    return <Redirect to={'/'} />
  }
  return (
    <Layout>
      <form onSubmit={registerUser}>
        <h1>Sign up</h1>

        <input
          name="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />

        <input
          name="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />

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
          <button>Sign up</button>
        </div>
      </form>
    </Layout>
  )
}

export default RegisterPage
