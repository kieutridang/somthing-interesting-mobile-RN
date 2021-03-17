import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import RNFS from 'react-native-fs';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const HomeScreen = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoading, setIsLoading] = useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handleOpenCamera = () => {
    launchCamera(
      {
        mediaType: 'video',
        videoQuality: 'high',
        durationLimit: 30,
      },
      mediaCallback,
    );
  };

  const handleOpenGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'video',
        videoQuality: 'high',
      },
      mediaCallback,
    );
  };

  const mediaCallback = useCallback(async resp => {
    if (resp.didCancel) {
      return;
    }
    if (resp.errorCode) {
      Alert.alert('Error', resp.errorMessage);
      return;
    }

    const {uri} = resp;
    if (Platform.OS === 'android') {
      // copy file path from temp path (read only) to app document path for processing
      setIsLoading(true);
      const extention = uri.substr(uri.lastIndexOf('.') + 1);
      const destPath = `${RNFS.DocumentDirectoryPath}/input.${extention}`;
      await RNFS.copyFile(uri, destPath);
      setIsLoading(false);
      navigation.navigate('VideoPreview', {videoUri: destPath});
    } else {
      navigation.navigate('VideoPreview', {videoUri: uri});
    }
  }, []);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={[backgroundStyle, styles.container]}>
      <Button title="Create 30s video" onPress={handleOpenCamera} />
      <View style={styles.devider} />
      <Button title="Select Video" onPress={handleOpenGallery} />
      {isLoading && <ActivityIndicator size="large" color="yellow" />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  devider: {
    height: 16,
  },
});

export default HomeScreen;
