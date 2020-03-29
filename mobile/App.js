import React from 'react';
import { StyleSheet, Text, View  } from 'react-native';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import servicesapi from './src/services/api';
global.api = servicesapi;
import Routes from './src/routes';


export default function App() {
  return (
    <Routes />
  );
}

