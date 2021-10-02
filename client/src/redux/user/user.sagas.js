import { takeLatest, put, all, call } from 'redux-saga/effects'

import userActionTypes from './user.types'

import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure } from './user.actions'

import { googleProvider, auth, createUserProfileDucument, getCurrentUser } from '../../firebase/firebase.utils'
import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword } from '@firebase/auth'
import { getDoc } from '@firebase/firestore'


export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(createUserProfileDucument, userAuth, additionalData)
    const userSnapshot = yield getDoc(userRef)
    yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))

  } catch (error) {
    yield put(signInFailure(error))
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield signInWithPopup(auth, googleProvider)
    yield getSnapshotFromUserAuth(user)

  } catch (error) {
    yield put(signInFailure(error))
  }
}

export function* signInWithEmail({payload: {email, password}}) {
  try {
    const { user } = yield signInWithEmailAndPassword(auth, email, password)
    yield getSnapshotFromUserAuth(user)

  } catch (error) {
    yield put(signInFailure(error))
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser()
    if (!userAuth) return
    yield getSnapshotFromUserAuth(userAuth)
  } catch (error) {
    yield put(signInFailure(error))
  }
}

export function* signOut() {
  try {
    yield auth.signOut()
    yield put(signOutSuccess())
  } catch (error) {
    yield put(signOutFailure(error))
  }
}

export function* signUp({payload: { email, password, displayName}}) {
  try {
    const { user } = yield createUserWithEmailAndPassword(auth, email, password)
    yield put(signUpSuccess({ user, additionalData: { displayName } }))
  } catch (error) {
    yield put(signUpFailure(error))
  }
}

export function* signInAfterSignOut({ payload: { user, additionalData }}) {
  yield getSnapshotFromUserAuth(user, additionalData)
}

export function* onGoogleSignInStart() {
  yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
  yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onCheckUserSession() {
  yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignOutStart() {
  yield takeLatest(userActionTypes.SIGN_OUT_START, signOut)
}

export function* onSignUpStart() {
  yield takeLatest(userActionTypes.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
  yield takeLatest(userActionTypes.SIGN_UP_SUCCESS, signInAfterSignOut)
}

export function* userSagas() {
  yield all([call(onGoogleSignInStart), 
    call(onEmailSignInStart), 
    call(onCheckUserSession), 
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
  ])
}