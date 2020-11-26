import React, { useEffect, useState } from 'react'
import './style.css'
import Layout from '../../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import {
  getRealtimeConversations,
  getRealtimeUsers,
  updateMessage,
} from '../../actions/userActions'

const User = (props) => {
  // user,onClick is in the props as arguments
  const { user, onClick } = props
  return (
    <div onClick={() => onClick(user)} className="displayName">
      {/* <div className="displayPic"> */}
      {/* <img
          src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg"
          alt=""
        />
      </div> */}
      <div
        style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'space-between',
          margin: '0 10px',
        }}
      >
        <span style={{ fontWeight: 500 }}>
          {user.firstName} {user.lastName}
        </span>
        <span
          className={user.isOnline ? `onlineStatus` : `onlineStatus off`}
        ></span>
      </div>
    </div>
  )
}

const HomePage = (props) => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const user = useSelector((state) => state.user)
  const [chatStarted, setChatStarted] = useState(false)
  const [chatUser, setChatUser] = useState('')
  const [message, setMessage] = useState('')
  let unsubscribe
  useEffect(() => {
    unsubscribe = dispatch(getRealtimeUsers(auth.uid))
      .then((unsubscribe) => {
        return unsubscribe
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  // component will unmount
  useEffect(() => {
    return () => {
      // clearnup
      unsubscribe.then((f) => f()).catch((error) => console.log(error))
    }
  }, [])

  // click each user
  const initChat = (user) => {
    setChatStarted(true)
    console.log(user)
    setChatUser(user)
    dispatch(getRealtimeConversations({ uid_1: auth.uid, uid_2: user.uid }))
  }
  const submitMessage = (e) => {
    const msgObj = {
      user_uid_1: auth.uid,
      user_uid_2: chatUser.uid,
      message,
    }
    if (message !== '') {
      dispatch(updateMessage(msgObj))
    }
    // console.log(msgObj)
    setMessage('')
  }
  return (
    <Layout>
      <section className="container">
        <div className="listOfUsers">
          {user.users.length > 0
            ? user.users.map((user) => {
                return <User key={user.uid} user={user} onClick={initChat} />
              })
            : null}
        </div>
        <div className="chatArea">
          {chatStarted ? (
            <div className="chatHeader">
              {chatUser.firstName} {chatUser.lastName}{' '}
            </div>
          ) : (
            ''
          )}
          <div className="messageSections">
            {chatStarted
              ? user.conversations.map((conversation) => (
                  <div
                    style={{
                      textAlign:
                        conversation.user_uid_1 == auth.uid ? 'right' : 'left',
                    }}
                  >
                    <p className="messageStyle">{conversation.message}</p>
                  </div>
                ))
              : null}
          </div>
          {chatStarted ? (
            <div className="chatControls">
              <textarea
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value)
                  // console.log(message)
                }}
                placeholder="Write a message"
              />
              <button onClick={submitMessage}>Send</button>
            </div>
          ) : null}
        </div>
      </section>
    </Layout>
  )
}

export default HomePage
