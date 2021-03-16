import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../containers/Home';
import VideoPreviewScreen from '../containers/VideoPreview';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ProcessVideoScreen from '../containers/ProcessVideo';
import FinalResultScreen from '../containers/FinalResult';

const Stack = createStackNavigator();

const RootNavigation = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        },
        headerTintColor: isDarkMode ? Colors.lighter : Colors.darker,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="VideoPreview"
        options={{
          title: 'Preview',
        }}
        component={VideoPreviewScreen}
      />
      <Stack.Screen
        name="ProcessVideo"
        options={{
          title: 'Cooking',
        }}
        component={ProcessVideoScreen}
      />
      <Stack.Screen
        name="FinalResult"
        options={{
          title: 'Happy ?',
        }}
        component={FinalResultScreen}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;
