export type SourceListState = {
  isLoading: boolean;
  searchInput: string;
  filteredItem: Array<News>;
  sourceList: Array<News>;
};

export type News = {
  id: string;
  name: string;
  url: string;
};
