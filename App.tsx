/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import {
  useCameraDevice,
  Camera,
  useCodeScanner,
} from 'react-native-vision-camera';
import Carousel from 'pinar';

function App(): React.JSX.Element {
  const [cameraScreen, setCameraScreen] = useState(false);

  const device = useCameraDevice('back')!;
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'code-128', 'code-93'],
    onCodeScanned: codes => {
      console.log(`Scanned ${codes[0].value} codes!`);
    },
  });

  const handleSlideChange = slideDetails => {
    if (slideDetails.index === 0) {
      setCameraScreen(false);
    } else {
      setCameraScreen(true);
    }
  };

  const onCameraInitialized = useCallback(() => {
    // Code here..
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <Carousel
          scrollEnabled={false}
          loop={true}
          showsDots={false}
          autoplay={false}
          mergeStyles={true}
          onIndexChanged={handleSlideChange}
          controlsTextStyle={{
            color: 'yellow',
            marginBottom: 300,
          }}>
          <View style={styles.slide}>
            {/* NFC Start */}
            <View>
              <TouchableOpacity activeOpacity={0.5}>
                <Text>NFC</Text>
              </TouchableOpacity>
              <Text style={styles.scanText}>NFC works in this screen...</Text>
            </View>
            {/* NFC END */}
          </View>
          <View style={styles.slide}>
            <View style={styles.outerScanContainer}>
              <View style={styles.scanContainer}>
                {/* Camera Start */}
                {
                  <Camera
                    style={styles.cameraViewStyle}
                    codeScanner={codeScanner}
                    device={device}
                    isActive={cameraScreen}
                    // onInitialized={onCameraInitialized}
                  />
                }
              </View>
            </View>
            {/* Camera End */}
            <View>
              <Text style={styles.nfcText}>Camera goes here...</Text>
            </View>
          </View>
        </Carousel>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scanContainer: {
    width: '50%',
    height: '50%',
    borderRadius: 90,
    overflow: 'hidden',
    position: 'absolute',
    left: '5%',
    top: '9%',
  },
  outerScanContainer: {
    marginTop: 40,
    width: '80%',
    height: '65%',
    // borderRadius: 120,
    position: 'relative',
  },
  scanText: {
    alignSelf: 'center',
    color: 'grey',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  nfcText: {
    alignSelf: 'center',
    color: 'grey',
    fontSize: 18,
    textAlign: 'center',
    paddingTop: 10,
    marginBottom: 250,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraViewStyle: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
  },
});

export default App;
