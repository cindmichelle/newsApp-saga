import * as React from 'react';
import {TouchableOpacity, Animated, Text, StyleSheet} from 'react-native';

type News = {
  id: string;
  name: string;
  url: string;
};

type ItemRowProps = {
  item: News;
  onPress: (item: News) => void;
};

export default class ItemRow extends React.Component<ItemRowProps, {}> {
  state = {
    springValue: new Animated.Value(1),
  };
  _spring = () => {
    this.state.springValue.setValue(0.8);
    Animated.spring(this.state.springValue, {
      toValue: 1,
      friction: 12,
    }).start();
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.list}
        onPress={() => {
          this._spring();
          this.props.onPress(this.props.item);
        }}
      >
        <Animated.Text
          style={[styles.title, {transform: [{scale: this.state.springValue}]}]}
        >
          {this.props.item.name}
        </Animated.Text>
        <Text style={styles.chevron}>></Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginLeft: 20,
  },
  list: {
    flex: 1,
    borderColor: 'grey',
    borderWidth: 1,
    height: 60,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chevron: {
    color: 'grey',
    position: 'absolute',
    right: 20,
    fontSize: 15,
  },
});
