import watchFetchFromServer from './fetchFromServerSaga';
import watchFilterItem from './filterItemSaga';
import fetchFromNewsList from './fetchFromNewsList';
import {all} from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([watchFetchFromServer(), watchFilterItem(), fetchFromNewsList()]);
}
