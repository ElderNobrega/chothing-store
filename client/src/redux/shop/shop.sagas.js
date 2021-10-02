import { takeLatest, call, put, all } from 'redux-saga/effects'

import { collection, getDocs } from "@firebase/firestore";
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";

import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';

import ShopActionsType from './shop.types'

export function* fetchCollectionsAsync() {
  yield console.log('I am fired')

  try {
    const collectionRef = collection(firestore, 'collections')
    const snapshot = yield getDocs(collectionRef)
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot)
    yield put(fetchCollectionsSuccess(collectionsMap))
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message))
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(ShopActionsType.FETCH_COLLECTIONS_START, fetchCollectionsAsync)
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)])
}