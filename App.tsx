/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useMemo, useRef, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  useWindowDimensions,
  StatusBar,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  Vibration,
  Modal,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {useDebounce} from 'use-debounce';
type SectionProps = PropsWithChildren<{
  title: string;
}>;

import {Camera, CameraType} from 'react-native-camera-kit';
const defaultPath =
  'https://cdn.statically.io/gh/mojtabaasadi/evand-ticket-gate/master/sampleData.json';
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const {height} = useWindowDimensions();
  const camera = useRef(null);
  const [scannedCode, setScanned] = useState(null);
  const [code] = useDebounce(scannedCode, 1000);
  const [path, setPath] = useState(defaultPath);
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const foundAtttendee = useMemo(() => {
    if (attendees.length) {
      return attendees.find(att => att.code === code);
    }
    return null;
  }, [code]);

  const viratedFor = useRef(null);
  const shownName = useRef(null);
  useEffect(() => {
    if (
      scannedCode &&
      code &&
      scannedCode !== code &&
      code !== viratedFor.current
    ) {
      Vibration.vibrate([150, 300]);
      viratedFor.current = code;
    }
  }, [scannedCode, code]);

  useEffect(() => {
    shownName.current = foundAtttendee?.code;
    setTimeout(() => {
      if (shownName.current && shownName.current === foundAtttendee?.code) {
        setScanned(null);
      }
    }, 2000);
  }, [foundAtttendee]);

  useEffect(() => {
    setLoading(true);
    fetch(path + '?' + new Date().getTime())
      .then(res => res.json())
      .then(res => {
        setAttendees(res);
      })
      .finally(() => setLoading(false));
  }, [path]);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const onReadCode = event => setScanned(event?.nativeEvent?.codeStringValue);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <TouchableOpacity
        onPress={() => setShowInput(v => !v)}
        style={[styles.btn, styles.button, styles.buttonClose]}>
        <Text style={styles.textStyle}>Download Data</Text>
      </TouchableOpacity>
      <Camera
        ref={camera}
        cameraType={CameraType.Back}
        style={[styles.camera, {height}]}
        flashMode="auto"
        scanBarcode={true}
        onReadCode={onReadCode}
        showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner, that stops when a code has been found. Frame always at center of the screen
        laserColor="red" // (default red) optional, color of laser in scanner frame
        frameColor="white"
      />
      {Boolean(foundAtttendee || loading) && (
        <View style={styles.bottom}>
          {foundAtttendee && !showInput && (
            <Text style={styles.attendee}>{foundAtttendee?.name}</Text>
          )}
          {loading && <ActivityIndicator size={'large'} />}
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showInput}
        onRequestClose={() => {
          setShowInput(!showInput);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              value={path}
              onChangeText={setPath}
            />
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setShowInput(!showInput)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btn: {
    padding: 10,
    top: 15,
    left: 15,
    zIndex: 2,
    position: 'absolute',
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightblue',
    padding: 10,
    width: '100%',
    marginBottom: 10,
  },
  bottom: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 100,
    padding: 15,
    bottom: 0,
    position: 'absolute',
    zIndex: 3,
  },
  camera: {
    height: 400,
  },
  attendee: {
    fontSize: 35,
    color: 'green',
  },
  centeredView: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default App;
