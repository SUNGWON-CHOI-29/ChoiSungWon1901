import React, { Component } from 'react';
import TrackPlayer from 'react-native-track-player';
import { TouchableWithoutFeedback, StyleSheet, Text, View, Image} from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageButton: {
    width: 200,
    height: 200,
  },
});

class ImageButton extends Component {
  render() {
    var playPauseImage = this.props.isSelected
    ? require('./assets/img/button_pause.png')
    : require('./assets/img/button_play.png')

    return (
      <TouchableWithoutFeedback onPress={this.props.onPressButton}>
        <Image source={playPauseImage} style={styles.imageButton}/>
      </TouchableWithoutFeedback>
    );
  }
}

export default class FirstView extends Component {
  state = { isSelected: false}

  _onPressButtonFromParent = () => {
     this.setState(previousState => (
       {isSelected: !previousState.isSelected}
       ))
  }
  render() {
    return (
      // Try removing the `flex: 1` on the parent View.
      // The parent will not have dimensions, so the children can't expand.
      // What if you add `height: 300` instead of `flex: 1`?
      <View style={styles.container}>
        <ImageButton onPressButton= {()=> this._onPressButtonFromParent()} isSelected= {this.state.isSelected} />
      </View>
    );
  }
}
