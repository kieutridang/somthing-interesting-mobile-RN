import CameraRoll from '@react-native-community/cameraroll';
import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Share from 'react-native-share';
import Video from 'react-native-video';

const FinalResultScreen = ({navigation, route}) => {
  const {resultUri} = route.params;
  const [videoPaused, setPaused] = useState(false);

  const handleSaveToDevice = () => {
    setPaused(true);
    CameraRoll.save(resultUri, {type: 'video'})
      .then(() => {
        Alert.alert('Done', 'Your work has been saved to library.');
      })
      .catch(error => {
        console.log('error :>> ', error);
        Alert.alert('Oops!', 'Something is broken, check log.');
      });
  };
  const handleShare = () => {
    Share.open({
      url: `file://${resultUri}`,
      type: 'video/mp4',
      message: 'Something cool I made with React Native !',
    }).catch(error => {
      console.log('error :>> ', error);
      Alert.alert('Oops!', error);
    });
  };
  const handleNewVideo = () => {
    navigation.popToTop();
  };
  return (
    <View style={styles.container}>
      <Video
        source={{uri: resultUri}}
        style={styles.container}
        controls
        paused={videoPaused}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleSaveToDevice}>
          <Text>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleShare}>
          <Text>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNewVideo}>
          <Text>New video</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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

export default FinalResultScreen;
