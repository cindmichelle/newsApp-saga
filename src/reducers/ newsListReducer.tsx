import {NewsListState} from '../types/NewsListState';

const initialStateNewsList: NewsListState = {
  newsList: [],
  isLoading: true,
};

export default function newsListReducer(
  state = initialStateNewsList,
  action: any,
) {
  switch (action.type) {
    case 'FETCH_NEWSLIST_FINISH': {
      console.log('FROM NEWSLIST REDUCER');
      return {
        ...state,
        isLoading: false,
        newsList: action.newsList,
      };
    }
    default: {
      return state;
    }
  }
}
