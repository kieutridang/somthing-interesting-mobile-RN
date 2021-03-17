import React from 'react';
import {useCallback} from 'react';
import {useState} from 'react';
import {useRef} from 'react';
import {useEffect} from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RNFFmpeg, RNFFmpegConfig} from 'react-native-ffmpeg';
import RNFS from 'react-native-fs';

const SAMPLE_AUDIO = Platform.select({
  ios: 'https://dl.espressif.com/dl/audio/ff-16b-2c-44100hz.m4a',
  android:
    'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_2MG.mp3',
});

const SAMPLE_WATERMARK =
  'https://www.pngjoy.com/pngl/210/4101015_vietnam-flag-vietnam-flag-vector-transparent-png.png';

const ProcessVideoScreen = ({route, navigation}) => {
  const {videoUri, mode} = route.params;
  const [resultPath, setResultPath] = useState();
  const [processLog, setLog] = useState('');
  const scrollView = useRef(null);

  useEffect(() => {
    RNFFmpegConfig.enableLogCallback(logCallback);
    switch (mode) {
      case 'audio':
        mergeAudioVideo();
        break;
      case 'watermark':
        mergeVideoWatermark();
        break;
      default:
        break;
    }
  }, []);

  const logCallback = useCallback(log => {
    setLog(prev => prev.concat(`${log.executionId}:${log.message}\n`));
  }, []);

  const mergeAudioVideo = () => {
    RNFFmpeg.executeAsync(
      `-y -i ${videoUri} -i ${SAMPLE_AUDIO} -map 0:v -map 1:a -c:v copy -c:a copy -vcodec copy -shortest ${RNFS.DocumentDirectoryPath}/output.mp4 -y`,
      result => {
        if (result.returnCode === 0) {
          setResultPath(`${RNFS.DocumentDirectoryPath}/output.mp4`);
          navigation.navigate('FinalResult', {
            resultUri: `${RNFS.DocumentDirectoryPath}/output.mp4`,
          });
        } else {
          setResultPath(`Return code: ${result.returnCode}`);
        }
      },
    );
  };

  const mergeVideoWatermark = () => {
    // scale watermark
    RNFFmpeg.executeAsync(
      `-y -i ${SAMPLE_WATERMARK} -vf scale=200:-2 ${RNFS.DocumentDirectoryPath}/watermark.png -y`,
      result => {
        if (result.returnCode === 0) {
          RNFFmpeg.executeAsync(
            `-y -i ${videoUri} -i ${RNFS.DocumentDirectoryPath}/watermark.png -filter_complex "overlay=main_w-overlay_w-10:main_h-overlay_h-10" ${RNFS.DocumentDirectoryPath}/output.mp4 -y`,
            result => {
              if (result.returnCode === 0) {
                setResultPath(`${RNFS.DocumentDirectoryPath}/output.mp4`);
                navigation.navigate('FinalResult', {
                  resultUri: `${RNFS.DocumentDirectoryPath}/output.mp4`,
                });
              } else {
                setResultPath(`Return code: ${result.returnCode}`);
              }
            },
          );
        } else {
          Alert.alert('Oops', 'Failed to attach watermark.');
        }
      },
    );
  };

  const onContentSizeChange = () => {
    scrollView.current.scrollToEnd({animated: true});
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        ref={scrollView}
        onContentSizeChange={onContentSizeChange}>
        <Text>{processLog}</Text>
      </ScrollView>

      {resultPath && <Text>{resultPath}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProcessVideoScreen;
