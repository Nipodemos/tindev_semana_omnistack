import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Routes from './routes';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket',
])

function App() {
  return (
    <View >
      <Routes />
    </View>
  );
}

export default App;
