import {put, takeLatest} from 'redux-saga/effects';
import {News} from '../types/SourceListState';
// const sleep = (ms: number) =>
//   new Promise((res: () => void) => setTimeout(res, ms));

const API_KEY = 'cab05d4f83864639a41651a3bc73c1b1';
const HOME_URL = `https://newsapi.org/v2/sources?apiKey=${API_KEY}`;

function* fetchFromServer(action: any) {
  // console.log(action, 'ACTION');
  if (action.type === 'FETCH_SOURCELIST') {
    try {
      let fetchURL = yield fetch(HOME_URL);
      let resjson = yield fetchURL.json();
      let results = yield resjson.sources;

      let sourcesList = results.map((result: News) => {
        return {
          id: result.id,
          name: result.name,
          url: result.url,
        };
      });

      // console.log('SOURCELIST', sourcesList);
      yield put({type: 'FETCH_SOURCELIST_FINISH', sourcesList});
    } catch (error) {
      console.log('error', error);
    }
  }
}

export default function* watchFetchFromServer() {
  yield takeLatest('FETCH_SOURCELIST', fetchFromServer);
}
