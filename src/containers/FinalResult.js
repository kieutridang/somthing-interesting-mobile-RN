import React from 'react';
import {StyleSheet, View} from 'react-native';
import Video from 'react-native-video';

const FinalResultScreen = ({navigation, route}) => {
  const {resultUri} = route.params;

  return (
    <View style={styles.container}>
      <Video source={{uri: resultUri}} style={styles.container} controls />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FinalResultScreen;
