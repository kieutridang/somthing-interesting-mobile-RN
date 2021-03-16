import React from 'react';
import {useCallback} from 'react';
import {
  Alert,
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const HomeScreen = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handleOpenCamera = () => {
    launchCamera(
      {
        mediaType: 'video',
        videoQuality: Platform.select({
          ios: 'medium',
          android: 'high',
        }),
        durationLimit: 30,
        // saveToPhotos: true,
      },
      mediaCallback,
    );
  };

  const handleOpenGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'video',
        videoQuality: Platform.select({
          ios: 'medium',
          android: 'high',
        }),
      },
      mediaCallback,
    );
  };

  const mediaCallback = useCallback(resp => {
    if (resp.didCancel) {
      return;
    }
    if (resp.errorCode) {
      Alert.alert('Error', resp.errorMessage);
      return;
    }

    const {uri} = resp;
    navigation.navigate('VideoPreview', {videoUri: uri});
  }, []);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={[backgroundStyle, styles.container]}>
      <Button title="Create 30s video" onPress={handleOpenCamera} />
      <View style={styles.devider} />
      <Button title="Select Video" onPress={handleOpenGallery} />
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