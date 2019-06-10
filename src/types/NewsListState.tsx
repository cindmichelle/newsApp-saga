export type NewsListState = {
  newsList: Array<News>;
  isLoading: boolean;
};

export type News = {
  author: string;
  url: string;
  title: string;
  description: string;
  urlToImage?: string;
  publishedAt: string;
  content: string;
};
