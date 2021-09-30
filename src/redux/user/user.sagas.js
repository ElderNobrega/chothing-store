import { takeLatest, put, all, call } from 'redux-saga/effects'

import userActionTypes from './user.types'

import { googleSignInSuccess, googleSignInFailure, googleSingInFailure } from './user.actions'

import { googleProvider, auth, createUserProfileDucument } from '../../firebase/firebase.utils'
import { signInWithPopup } from '@firebase/auth'
import { getDoc } from '@firebase/firestore'

export function* signInWithGoogle() {
  try {
    const { user } = yield signInWithPopup(auth, googleProvider)
    const userRef = yield call(createUserProfileDucument, user)
    const userSnapshot = yield getDoc(userRef)
    yield put(googleSignInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
  } catch (error) {
    yield put(googleSingInFailure(error))
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* userSagas() {
  yield all([call(onGoogleSignInStart)])
}