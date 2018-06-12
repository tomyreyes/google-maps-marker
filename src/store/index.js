import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from '../reducers'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas'
import logger from 'redux-logger'


const sagaMiddleware = createSagaMiddleware()


const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware, logger)
)

sagaMiddleware.run(rootSaga)

export default store