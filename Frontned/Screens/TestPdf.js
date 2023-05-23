import * as React from 'react';
import { View, StyleSheet, Button, Platform, Text } from 'react-native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';




const html = `
<html>
<head>
    <style>
        @page {
            size: A4;
            margin: 0;
        }

        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            padding: 20px;
        }

        .logo {
            position: relative;
            margin: 0 auto;
            width: 100%;
            height: 200px;
            background-image: url('https://images.squarespace-cdn.com/content/v1/5a5c896ab7411c8b282cbcce/1574250387974-QTMIT5O2BUCNIFAXIACE/Tale+Of+Us?format=1000w');
            background-size: cover;
            background-position: center;
    
        }

        .logo img {
            max-width: 150px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        .ticket {
            width: 600px;
            height: 700px;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            border: 1px solid #ccc;
            margin: 0 auto;
        }

        .event-info {
            margin-bottom: 20px;
            text-align: center;
        }

        .event-info h2 {
            margin-bottom: 10px;
            font-size: 24px;
        }

        .event-info p {
            margin: 5px 0;
            color: #555;
        }

        .user-info {
            margin-top: 20px;
        }

        .user-info p {
            margin-bottom: 5px;
            color: #555;
        }

        .qr-code {
            text-align: center;
            margin-top: 30px;
        }

        .qr-code img {
            max-width: 200px;
        }
    </style>
</head>
<body>
    <div class="ticket">
        <div class="logo">
           
        </div>
        <div class="event-info">
            <h2>Event Name</h2>
            <p>Date: May 31, 2023</p>
            <p>Time: 7:00 PM - 10:00 PM</p>
            <p>Location: Event Venue</p>
        </div>
        <div class="user-info">
            <p><strong>Name:</strong> John Doe</p>
            <p><strong>Email:</strong> johndoe@example.com</p>
            <p><strong>Order ID:</strong> ABC123</p>
        </div>
        <div class="qr-code">
            <img src="https://www.investopedia.com/thmb/hJrIBjjMBGfx0oa_bHAgZ9AWyn0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/qr-code-bc94057f452f4806af70fd34540f72ad.png" alt="QR Code">
        </div>
    </div>
</body>
</html>


`;

export default function App() {
  const [selectedPrinter, setSelectedPrinter] = React.useState();

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
    });
  };

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({ html });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };

  return (
    <View style={styles.container}>
      <View style={styles.spacer} />
      <Button title="save your ticket" onPress={printToFile} />
      {Platform.OS === 'ios' && (
        <>
          <View style={styles.spacer} />
          <View style={styles.spacer} />
          {selectedPrinter ? (
            <Text style={styles.printer}>{`Selected printer: ${selectedPrinter.name}`}</Text>
          ) : undefined}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    flexDirection: 'column',
    padding: 8,
  },
  spacer: {
    height: 8,
  },
  printer: {
    textAlign: 'center',
  },
});
