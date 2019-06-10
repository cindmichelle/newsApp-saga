import * as React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  View,
  ListRenderItemInfo,
  // StatusBar,
} from 'react-native';

import {NavigationScreenProp, NavigationState} from 'react-navigation';

import {connect} from 'react-redux';
import {RootState} from '../types/rootState';
import {News} from '../types/NewsListState';

type Props = {
  navigation: NavigationScreenProp<NavigationState>;
  newsList: Array<News>;
  isLoading: boolean;
  fetchData: (id: string) => void;
};

const NO_IMAGE =
  'https://vignette.wikia.nocookie.net/undertale-rho/images/5/5f/Placeholder.jpg/revision/latest?cb=20180213155916';

class NewsListScreen extends React.Component<Props, {}> {
  static navigationOptions = (props: Props) => {
    let {navigation} = props;
    return {
      title: navigation.getParam('name', 'NO-NAME'),
    };
  };

  _keyExtractor = (item: News) => item.url;

  _renderItem = ({item}: ListRenderItemInfo<News>) => {
    let {url, title} = item;
    return (
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.list}
          activeOpacity={0.7}
          onPress={() => this.props.navigation.navigate('News', {url, title})}
        >
          <Image
            source={{uri: item.urlToImage || NO_IMAGE}}
            style={styles.thumbnail}
          />

          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>by </Text>
            <Text style={[styles.subtitle, styles.author]}>{item.author}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  componentDidMount() {
    let id = this.props.navigation.getParam('id', 'NO-ID');
    this.props.fetchData(id);
  }

  render() {
    let {isLoading} = this.props;
    return isLoading ? (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="red" />
      </View>
    ) : (
      <FlatList
        keyExtractor={this._keyExtractor}
        data={this.props.newsList}
        renderItem={this._renderItem}
        style={styles.flatList}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    isLoading: state.newsListState.isLoading,
    newsList: state.newsListState.newsList,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchData: (id: string) => dispatch({type: 'FETCH_NEWSLIST', id}),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewsListScreen);

const styles = StyleSheet.create({
  flatList: {
    backgroundColor: 'whitesmoke',
    paddingLeft: 8,
    paddingRight: 8,
  },
  card: {marginVertical: 5, shadowOpacity: 0.4},
  list: {
    marginTop: 10,
    paddingTop: 10,
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  thumbnail: {
    alignSelf: 'stretch',
    height: 230,
  },
  title: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 25,
    fontWeight: 'bold',
  },
  subtitleContainer: {
    flexDirection: 'row',
  },
  subtitle: {
    fontSize: 15,
  },
  author: {
    fontStyle: 'italic',
  },
});
