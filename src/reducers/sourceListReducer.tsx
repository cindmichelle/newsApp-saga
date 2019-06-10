import {SourceListState} from '../types/SourceListState';

const initialStateSourceList: SourceListState = {
  sourceList: [],
  filteredItem: [],
  searchInput: '',
  isLoading: true,
};

export default function sourceListReducer(
  state = initialStateSourceList,
  action: any,
) {
  switch (action.type) {
    case 'FETCH_SOURCELIST_FINISH': {
      // console.log('IN REDUCER', action);
      return {
        ...state,
        isLoading: false,
        sourceList: action.sourcesList,
        filteredItem: action.sourcesList,
      };
    }
    case 'ON_SEARCH_CHANGE': {
      return {...state, searchInput: action.text};
    }

    case 'FILTER_INACTIVE': {
      return {...state, filteredItem: state.sourceList};
    }

    case 'FILTER_ACTIVE': {
      return {...state, filteredItem: action.filteredItem};
    }
    default:
      return state;
  }
}
