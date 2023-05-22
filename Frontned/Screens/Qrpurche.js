import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';

const Qrpurche = ({ route }) => {
  const { event } = route.params;
  const [screenshotURI, setScreenshotURI] = useState(null);
  const qrData = JSON.stringify();
  const ref = useRef();
  const start=event.start_time.slice(11, 16);
  const captureScreenshot = async () => {
    try {
      const uri = await ref.current.capture();
      setScreenshotURI(uri);
      Alert.alert('Screenshot captured!');
    } catch (error) {
      Alert.alert('Error capturing screenshot.');
    }
  };

  return (
    <View style={styles.container}  ref={ref}>
      <ImageBackground
        resizeMode="cover"
        source={{
          uri: event.img,
        }}
        style={styles.imageBackground}
       
      >
        <Text style={styles.headerText}>Here is your ticket</Text>
        <Text style={styles.text}>date start : {start}</Text>
        <Text style={styles.text}>Place:{event.location}</Text>
        <QRCode value={qrData} size={200} />
      </ImageBackground>


      {screenshotURI && (
        <ImageBackground
          resizeMode="cover"
          source={{ uri: screenshotURI }}
          style={styles.screenshotImageBackground}
        >
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setScreenshotURI(null)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </ImageBackground>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 28,
    color: 'black',
    marginBottom: 20,
    fontWeight:"bold"
  },
  imageBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.9,
    width: '100%',
  },
  text: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
    fontWeight:"bold",
   
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#4285F4',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    
  },
  screenshotImageBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.9,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 10,
    padding: 10,
    backgroundColor: '#4285F4',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Qrpurche;
