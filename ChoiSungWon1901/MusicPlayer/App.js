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
class MyPlayerBar extends TrackPlayer.ProgressComponent {
    _currentTime= ()=>{
    const minute = parseInt(this.state.position/60).toString().padStart(2,"0")
    const second = parseInt(this.state.position%60).toString().padStart(2,"0")
    const milsec =  parseInt((this.state.position%1)*100).toString().padStart(2,"0")
    return `${minute}:${second}:${milsec}`
    }
    render() {
      // console.warn({currentTime})
        return (
            <View>
                <Text>{this._currentTime()}</Text>
            </View>
        );
    }
}

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

  componentDidMount() {
    TrackPlayer.setupPlayer().then(async () => {
      TrackPlayer.add({
          id: 'sound',
          url: require('./assets/sound.mp3'),
          title: 'Unknown',
          artist: 'Unknown'
        });
    });
    // TrackPlayer.addEventListener('playback-state', async (data) => {
    //     const state = await TrackPlayer.getState();
    //     console.warn({state})
    //   });
    TrackPlayer.addEventListener('playback-queue-ended', async (data) => {
        TrackPlayer.seekTo(0)
        this.setState(previousState => (
          {isSelected: false}
          ))
      });
  }
  _onPressButtonFromParent = () => {
     this.setState(previousState => (
       {isSelected: !previousState.isSelected}
       ))
     this.state.isSelected == false? TrackPlayer.play() : TrackPlayer.pause()
  }
  render() {
    return (
      // Try removing the `flex: 1` on the parent View.
      // The parent will not have dimensions, so the children can't expand.
      // What if you add `height: 300` instead of `flex: 1`?
      <View style={styles.container}>
        <ImageButton onPressButton= {()=> this._onPressButtonFromParent()} isSelected= {this.state.isSelected} />
        <MyPlayerBar/>
      </View>
    );
  }
}
