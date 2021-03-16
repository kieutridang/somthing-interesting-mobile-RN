import React, {useRef} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Video from 'react-native-video';

const VideoPreviewScreen = ({route, navigation}) => {
  const {videoUri} = route.params;
  const videoPlayer = useRef(null);
  return (
    <View style={styles.container}>
      <Video
        source={{uri: videoUri}}
        ref={videoPlayer}
        style={styles.video}
        controls
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button}>
          <Text>Add Music</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>Add Watermark</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  video: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    margin: 8,
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
  },
});

export default VideoPreviewScreen;
