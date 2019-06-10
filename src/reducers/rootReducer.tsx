import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/rootSaga';
import sourceListReducer from './sourceListReducer';
import newsListReducer from './ newsListReducer';

const sagaMiddleware = createSagaMiddleware();

export default createStore(
  combineReducers({
    sourceListState: sourceListReducer,
    newsListState: newsListReducer,
  }),
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);
