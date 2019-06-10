import {RootState} from '../types/rootState';

export default function getSourceList(state: RootState) {
  return state.sourceListState.sourceList;
}
