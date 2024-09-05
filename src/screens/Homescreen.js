import React from 'react';
import {Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import ImageCard from '../components/Imagecard';
import Colors from '../constant/Colors';
import {hp} from '../constant/responsive';
import ImageBackgroundWrapper from '../components/Background';

export default function HomeScreen({navigation}) {
  const allCharImage = require('../assets/all.png');
  const deadCharImage = require('../assets/dead.png');
  const aliveCharImage = require('../assets/alive.png');

  return (
    <ImageBackgroundWrapper>
      <Text style={styles.app_title}>Rick & Morty</Text>
      <Text style={styles.app_subtitle}>Swipe and Select any card</Text>
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        horizontal={true}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('List', {type: 'alive'})}>
          <ImageCard imageurl={aliveCharImage} title={'Alive'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('List', {type: 'all'})}>
          <ImageCard imageurl={allCharImage} title={'All'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('List', {type: 'dead'})}>
          <ImageCard imageurl={deadCharImage} title={'Dead'} />
        </TouchableOpacity>
      </ScrollView>
    </ImageBackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black,
  },
  app_title: {fontSize: 50, fontWeight: 'bold', textAlign: 'center'},
  card: {
    height: hp(30),
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.yellow,
  },
});
