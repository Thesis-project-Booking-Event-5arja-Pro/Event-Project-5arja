import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
const PaymentScreen = () => {
  const [name, setName] = useState('');
  const [card, setCard] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [receipt, setReceipt] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const containerRef = useRef(null);

  const handlePayment = () => {
    if (name && card && expiry && cvc) {
      if (card.length >= 10 && card.length <= 15) {
        setIsLoading(true);
        setShowLoading(true);
        const receiptId = Math.floor(Math.random() * 1000000000);
        setReceipt({
          id: receiptId,
          name,
          card,
          expiry,
          cvc,
        });
        setTimeout(() => {
          setIsLoading(false);
          setShowLoading(false);
          Alert.alert('Payment Successful!', 'Thank you for your purchase!');
        }, 2000);
      } else {
        Alert.alert('Payment Error', 'Please enter a valid card number.');
      }
    } else {
      Alert.alert('Payment Error', 'Please enter all payment details.');
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleSaveAsImage = async () => {
    const { status } = await Permissions.askAsync(
      Permissions.MEDIA_LIBRARY_WRITE_ONLY
    );
    if (status !== 'granted') {
      Alert.alert('Permission not granted');
      return;
    }
  
    try {
      const receiptImageUri = await captureRef(containerRef, {
        format: 'png',
        quality: 0.9,
      });
  
      const downloadsDirectory = `${FileSystem.documentDirectory}Download/`;
      const imageUri = `${downloadsDirectory}receipt_${receipt.id}.png`;
  
      await FileSystem.makeDirectoryAsync(downloadsDirectory, { intermediates: true });
      await FileSystem.moveAsync({
        from: receiptImageUri,
        to: imageUri,
      });
  
      // Request media library permission
      const { status: mediaStatus } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
  
      if (mediaStatus === 'granted') {
        // Save the image to the phone's media library
        await MediaLibrary.saveToLibraryAsync(imageUri);
        Alert.alert('Receipt saved!', 'Your receipt has been saved to the Downloads folder.');
        
      } else {
        Alert.alert('Media library permission not granted');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to save receipt.');
    }
  };

  const handleGoBack = () => {
    setReceipt(null);
    setName('');
    setCard('');
    setExpiry('');
    setCvc('');
    setImage(null);
  };

  return (
    <View style={styles.container}>
      {!receipt ? (
        <View>
          <View style={styles.form}>
            <Text style={styles.label}>Name on Card:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setName(text)}
              value={name}
            />
            <Text style={styles.label}>Card Number:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setCard(text)}
              value={card}
              keyboardType="numeric"
            />
            <Text style={styles.label}>Expiry Date:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setExpiry(text)}
              value={expiry}
              placeholder="MM/YY"
            />
            <Text style={styles.label}>CVC:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setCvc(text)}
              value={cvc}
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handlePayment}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.buttonText}>Pay Now</Text>
              )}
            </TouchableOpacity>
          </View>
          {/* <Text style={styles.orText}>OR</Text>
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Text style={styles.imagePickerText}>Pick Receipt Image</Text>
            )}
          </TouchableOpacity> */}
        </View>
      ) : (
        <View>
          <Text style={styles.receiptTitle}>Receipt</Text>
          <View style={styles.receipt}>
            <View style={styles.receiptSection}>
              <Text style={styles.receiptLabel}>Name:</Text>
              <Text style={styles.receiptText}>{receipt.name}</Text>
            </View>
            <View style={styles.receiptSection}>
              <Text style={styles.receiptLabel}>Card Number:</Text>
              <Text style={styles.receiptText}>{receipt.card}</Text>
            </View>
            <View style={styles.receiptSection}>
              <Text style={styles.receiptLabel}>Expiry Date:</Text>
              <Text style={styles.receiptText}>{receipt.expiry}</Text>
            </View>
            <View style={styles.receiptSection}>
              <Text style={styles.receiptLabel}>CVC:</Text>
              <Text style={styles.receiptText}>{receipt.cvc}</Text>
            </View>
          </View >
          <View ref={containerRef} style={styles.qrCode}>
            <QRCode value={`Receipt ID: ${receipt.id},Receipt Name: ${receipt.name} `} size={200} />
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveAsImage}>
            <Text style={styles.buttonText}>Save as Image</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      )}
      {showLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '80%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: 'white',
  },
  button: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 16,
    marginVertical: 20,
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePickerText: {
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
  },
  receiptTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
  },
  receipt: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  receiptSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  receiptLabel: {
    fontWeight: 'bold',
    color:'white'
  },
  receiptText: {
    textAlign: 'right',
    color:'white'
  },
  qrCode: {
    alignItems: 'center',
    marginBottom: 40,
    backgroundColor: 'white',
    marginVertical: 40,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  saveButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  goBackButton: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PaymentScreen;