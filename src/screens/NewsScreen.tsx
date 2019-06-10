import * as React from 'react';
import {WebView, ActivityIndicator, View} from 'react-native';

import {NavigationScreenProp, NavigationState} from 'react-navigation';

type Props = {
  navigation: NavigationScreenProp<NavigationState>;
};

type State = {
  isLoading: boolean;
  uri: string;
};

export default class NewsScreen extends React.Component<Props, State> {
  static navigationOptions = (props: Props) => {
    let {navigation} = props;
    return {
      title: navigation.getParam('title', 'NO-TITLE'),
    };
  };
  state = {
    isLoading: true,
    uri: '',
  };

  componentDidMount() {
    let {navigation} = this.props;
    let url = navigation.getParam('url', 'NO-URL');
    this.setState({uri: url});
  }

  render() {
    return (
      <WebView
        onLoadStart={() => {
          this.setState({isLoading: true});
          // console.log('start loading');
        }}
        onLoad={() => {
          this.setState({isLoading: false});
          // console.log('finished');
        }}
        renderLoading={() => {
          return (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
            >
              <ActivityIndicator size="large" color="red" />
            </View>
          );
        }}
        // Want to show the view or not
        startInLoadingState={true}
        originWhitelist={['*']}
        source={{uri: this.state.uri}}
      />
    );
  }
}
