import firebase from 'firebase'
import { authConstant } from './constants'

// register action
export const signup = (user) => {
  return async (dispatch) => {
    const db = firebase.firestore()
    dispatch({ type: `${authConstant.USER_LOGIN}_REQUEST` })
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        console.log(data)
        const currentUser = firebase.auth().currentUser
        const name = `${user.firstName} ${user.lastName}`
        currentUser
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            //  start a collection in db, go to firebase
            db.collection('user')
              // create a document of uid
              .doc(data.user.uid)
              .set({
                firstName: user.firstName,
                lastName: user.lastName,
                uid: data.user.uid,
                createdAt: new Date(),
                isOnline: true,
              })
              .then(() => {
                //succeful
                const loggedInUser = {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  uid: data.user.uid,
                  email: user.email,
                }
                localStorage.setItem('user', JSON.stringify(loggedInUser))
                console.log('User logged in successfully...!')
                dispatch({
                  type: `${authConstant.USER_LOGIN}_SUCCESS`,
                  payload: { user: loggedInUser },
                })
              })
          })
      })
      .catch((error) => {
        console.log(error)
        dispatch({
          type: `${authConstant.USER_LOGIN}_FAILURE`,
          payload: { error: error },
        })
      })
  }
}

// login action
export const signin = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: `${authConstant.USER_LOGIN}_REQUEST` })
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        console.log(data)
        const db = firebase.firestore()
        db.collection('user')
          .doc(data.user.uid)
          .update({
            isOnline: true,
          })
          .then(() => {
            const name = data.user.displayName.split(' ')
            const firstName = name[0]
            const lastName = name[1]

            const loggedInUser = {
              firstName,
              lastName,
              uid: data.user.uid,
              email: data.user.email,
            }

            localStorage.setItem('user', JSON.stringify(loggedInUser))

            dispatch({
              type: `${authConstant.USER_LOGIN}_SUCCESS`,
              payload: { user: loggedInUser },
            })
          })
          .catch((error) => {
            console.log(error)
            dispatch({
              type: `${authConstant.USER_LOGIN}_FAILURE`,
              payload: { error },
            })
          })
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

// * when reloading page, lose all state
export const isLoggedInUser = () => {
  return async (dispatch) => {
    const user = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null
    if (user) {
      console.log(user)
      const loggedInUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        uid: user.uid,
        email: user.email,
      }
      dispatch({
        type: `${authConstant.USER_LOGIN}_SUCCESS`,
        payload: { user: loggedInUser },
      })
    } else {
      dispatch({
        type: `${authConstant.USER_LOGIN}_FAILURE`,
        payload: { error: 'Login again please' },
      })
    }
  }
}

export const logout = (uid) => {
  return async (dispatch) => {
    dispatch({ type: `${authConstant.USER_LOGOUT}_REQUEST` })

    // * update the offline state
    const db = firebase.firestore()
    db.collection('user')
      .doc(uid)
      .update({
        isOnline: false,
      })
      .then(() => {
        firebase
          .auth()
          .signOut()
          .then(() => {
            //successfully
            localStorage.clear()
            dispatch({ type: `${authConstant.USER_LOGOUT}_SUCCESS` })
          })
          .catch((error) => {
            console.log(error)
            dispatch({
              type: `${authConstant.USER_LOGOUT}_FAILURE`,
              payload: { error },
            })
          })
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

// Change name
export const changeNameAction = (uid, firstName, lastName, email) => {
  return async (dispatch) => {
    dispatch({ type: `${authConstant.USER_NAME_CHANGE}_REQUEST` })

    // * update name
    const db = firebase.firestore()
    db.collection('user')
      .doc(uid)
      .update({
        firstName: `${firstName}`,
        lastName: `${lastName}`,
        uid: `${uid}`,
        createdAt: Date.now(),
      })
      .then(() => {
        var currentUser = firebase.auth().currentUser

        const name = `${firstName} ${lastName}`
        currentUser.updateProfile({
          displayName: name,
        })
      })
      .then(() => {
        console.log('Document successfully updated!')

        const loggedInUser = {
          firstName,
          lastName,
          uid,
          email,
        }
        localStorage.setItem('user', JSON.stringify(loggedInUser))
        dispatch({
          type: `${authConstant.USER_NAME_CHANGE}_SUCCESS`,
          payload: { user: loggedInUser },
        })
      })
      .catch((error) => {
        console.log(error)
        dispatch({
          type: `${authConstant.USER_NAME_CHANGE}_FAILURE`,
          payload: { error },
        })
      })
  }
}
