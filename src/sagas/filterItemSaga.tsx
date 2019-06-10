import {put, takeEvery, select} from 'redux-saga/effects';
import {getSearchInput, getSourceList} from '../selectors/rootSelector';
import {News} from '../types/SourceListState';

function* filterItem() {
  let searchInput = yield select(getSearchInput);
  console.log('SOURCE LIST FROM searchInput SAGA', searchInput);

  if (searchInput === '') {
    yield put({type: 'FILTER_INACTIVE'});
  } else {
    let sourceList = yield select(getSourceList);

    console.log('SOURCE LIST FROM FILTER SAGA', sourceList);

    let filteredItem = yield sourceList.filter((item: News) => {
      return item.name.toLowerCase().includes(searchInput.toLowerCase());
    });
    yield put({type: 'FILTER_ACTIVE', filteredItem});
  }
}

export default function* watchFilterItem() {
  yield takeEvery('ON_SEARCH_CHANGE', filterItem);
}
