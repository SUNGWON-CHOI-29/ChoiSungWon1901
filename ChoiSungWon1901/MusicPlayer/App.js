import React, { Component } from 'react';
import TrackPlayer from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import { TouchableWithoutFeedback, StyleSheet, Text, View, Image} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  imageButton: {
    alignSelf: "center",
    width: 150,
    height: 150,
  },
  sliderText: {
    alignSelf: "center",
    paddingTop: 10,
    fontSize: 20,
  },
  slider: {
    paddingTop: 20,
  }
});
class MyPlayerBar extends TrackPlayer.ProgressComponent {
    _currentTime= ()=>{
    const minute = parseInt(this.state.position/60).toString().padStart(2,"0")
    const second = parseInt(this.state.position%60).toString().padStart(2,"0")
    const milsec =  parseInt((this.state.position%1)*100).toString().padStart(2,"0")
    return `${minute}:${second}:${milsec}`
    }
    _progressToTime= (progress)=>{
        TrackPlayer.getDuration().then(
          duration=>{
            const time = duration/100*progress*100
            TrackPlayer.seekTo(time)
        })
    }
    render() {
      // console.warn(this._currentTime())
        return (
            <View>
              <Text style={styles.sliderText}>{this._currentTime()}</Text>
              <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor={'red'}
              maximumTrackTintColor={'black'}
              value = {this.getProgress()}
              onSlidingComplete={value => this._progressToTime(value)}
              />
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
          artist: 'Unknown',
          duration: 9.37
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
      <View style={styles.container}>
        <ImageButton  onPressButton= {()=> this._onPressButtonFromParent()}
                      isSelected= {this.state.isSelected} />
        <MyPlayerBar/>
      </View>
    );
  }
}
