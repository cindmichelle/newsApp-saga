import * as React from 'react';
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
  TextInput,
  StatusBar,
  ListRenderItemInfo,
} from 'react-native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {connect} from 'react-redux';
import {RootState} from '../types/rootState';
import ItemRow from '../components/ItemRow';

type Props = {
  searchInput: string;
  isLoading: boolean;
  filteredItem: Array<News>;
  onSearchChange: (text: string) => void;
  fetchData: () => void;
  navigation: NavigationScreenProp<NavigationState>;
};
type News = {
  id: string;
  name: string;
  url: string;
};

class HomeScreen extends React.Component<Props, {}> {
  static navigationOptions = () => {
    return {
      title: 'Source List',
    };
  };

  state = {
    activeItem: null,
  };

  componentDidMount() {
    this.props.fetchData();
  }
  _onPress = (item: News) => {
    setTimeout(() => {
      let {id, name} = item;
      // console.log('FROM HOME', id);
      this.props.navigation.navigate('NewsList', {
        id,
        name,
      });
    }, 200);
  };

  _keyExtractor = (item: News) => item.id;

  _renderItem = ({item}: ListRenderItemInfo<News>) => {
    // console.log('ITEM', item);
    return <ItemRow item={item} onPress={this._onPress} />;
  };

  render() {
    let {isLoading, searchInput, filteredItem, onSearchChange} = this.props;
    // console.log('IS LOADING', isLoading);
    // console.log('FILTERED ITEM', filteredItem);
    return isLoading ? (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="red" />
      </View>
    ) : (
      <View>
        <StatusBar barStyle="light-content" />
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchInput}
            onChangeText={(text) => onSearchChange(text)}
          />
        </View>
        <FlatList
          keyExtractor={this._keyExtractor}
          data={filteredItem}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    searchInput: state.sourceListState.searchInput,
    isLoading: state.sourceListState.isLoading,
    filteredItem: state.sourceListState.filteredItem,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSearchChange: (text: string) =>
      dispatch({type: 'ON_SEARCH_CHANGE', text}),
    fetchData: () => dispatch({type: 'FETCH_SOURCELIST'}),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);

const styles = StyleSheet.create({
  list: {
    flex: 1,
    borderColor: 'grey',
    borderWidth: 1,
    height: 60,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginLeft: 20,
  },
  chevron: {
    color: 'grey',
    position: 'absolute',
    right: 20,
    fontSize: 15,
  },
  searchContainer: {
    padding: 10,
    borderWidth: 0.5,
  },
  searchInput: {
    borderWidth: 0.5,
    borderColor: 'grey',
    height: 35,
    fontSize: 17,
    borderRadius: 30,
    paddingLeft: 10,
  },
});
