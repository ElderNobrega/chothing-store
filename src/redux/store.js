import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

import rootRedux from './root-redux'

const middlewares = [logger]

const store = createStore(rootRedux, applyMiddleware(...middlewares))

export default store