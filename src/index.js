import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import firebase from 'firebase'
import { Provider } from 'react-redux'
import store from './store'
const firebaseConfig = {
  apiKey: 'AIzaSyCYOIlQ4Ql1mdQ-t5h3ljIHBZGwlNXVeFc',
  authDomain: 'chatapp-fcf70.firebaseapp.com',
  databaseURL: 'https://chatapp-fcf70.firebaseio.com',
  projectId: 'chatapp-fcf70',
  storageBucket: 'chatapp-fcf70.appspot.com',
  messagingSenderId: '678480293702',
  appId: '1:678480293702:web:0bb9cc4c86180516357f47',
  measurementId: 'G-CNYFQM6HSX',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
// firebase.analytics()

// window.store = store

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
