import {put, takeLatest} from 'redux-saga/effects';
import {News} from '../types/NewsListState';
const API_KEY = 'cab05d4f83864639a41651a3bc73c1b1';

function* fetchFromNewsList(action: any) {
  if (action.type === 'FETCH_NEWSLIST') {
    try {
      let {id} = action;
      let url = `https://newsapi.org/v2/top-headlines?sources=${id}&apiKey=${API_KEY}`;
      let fetchURL = yield fetch(url);
      let resjson = yield fetchURL.json();
      let results = yield resjson.articles;

      let newsList = results.map((news: News) => {
        return {
          author: news.author,
          url: news.url,
          title: news.title,
          description: news.description,
          urlToImage: news.urlToImage,
          publishedAt: news.publishedAt,
          content: news.content,
        };
      });

      yield put({type: 'FETCH_NEWSLIST_FINISH', newsList});
      console.log('FROM FETCH NEWSLIST SAGA');
    } catch (error) {
      console.log('error', error);
    }
  }
}
export default function* watchFetchFromServer() {
  yield takeLatest('FETCH_NEWSLIST', fetchFromNewsList);
}
