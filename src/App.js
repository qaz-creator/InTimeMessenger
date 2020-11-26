import './App.css'
import { BrowserRouter, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PrivateRoute from './components/PrivateRoute'
import { useDispatch, useSelector } from 'react-redux'
import { Fragment, useEffect } from 'react'
import { isLoggedInUser } from './actions'
function App() {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  // when reloading or changing a page
  useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isLoggedInUser())
    }
  }, [])

  return (
    <Fragment>
      <BrowserRouter>
        <PrivateRoute path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
      </BrowserRouter>
    </Fragment>
  )
}

export default App
