import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Video from 'react-native-video';

const VideoPreviewScreen = ({route, navigation}) => {
  const {videoUri} = route.params;
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setPaused(true);
    });

    return unsubscribe;
  }, [navigation]);

  const handleMergeAudio = () => {
    navigation.navigate('ProcessVideo', {
      mode: 'audio',
      videoUri,
    });
  };

  const handleMergeWatermark = () => {
    navigation.navigate('ProcessVideo', {
      mode: 'watermark',
      videoUri,
    });
  };

  return (
    <View style={styles.container}>
      <Video
        source={{uri: videoUri}}
        style={styles.video}
        controls
        muted={false}
        paused={paused}
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleMergeAudio}>
          <Text>Add Music</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleMergeWatermark}>
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
