import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import ImageCard from '../components/Imagecard';

export default function HomeScreen({navigation}) {
  const allCharImage = require('../assets/all.png');
  const deadCharImage = require('../assets/dead.png');
  const aliveCharImage = require('../assets/alive.png');

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('List', {type: 'all'})}>
        <ImageCard imageurl={allCharImage} title={'All'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('List', {type: 'alive'})}>
        <ImageCard imageurl={aliveCharImage} title={'Alive'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('List', {type: 'dead'})}>
        <ImageCard imageurl={deadCharImage} title={'Dead'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  card: {
    backgroundColor: 'darkred',
    padding: 10,
    marginVertical: 10,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'white',
  },
});
