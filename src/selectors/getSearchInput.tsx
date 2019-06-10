import {RootState} from '../types/rootState';

export default function getSearchInput(state: RootState) {
  return state.sourceListState.searchInput;
}
