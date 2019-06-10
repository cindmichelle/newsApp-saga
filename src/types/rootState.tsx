import {SourceListState} from './SourceListState';
import {NewsListState} from './NewsListState';

export type RootState = {
  sourceListState: SourceListState;
  newsListState: NewsListState;
};
