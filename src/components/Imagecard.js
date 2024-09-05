import React from 'react';
import {Text, StyleSheet, Image, View} from 'react-native';
import {wp} from '../constant/responsive';
import Colors from '../constant/Colors';

export default function ImageCard({imageurl, title, species}) {
  return (
    <View style={styles.imageCard}>
      <Image source={imageurl} style={styles.image} resizeMode="contain" />
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="clip">
        {title}
      </Text>
      <Text style={styles.subtitle}>{species}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  imageCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: wp(60),
    width: wp(40),
  },
  image: {
    height: wp(40),
    width: wp(30),
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    color: Colors.white,
  },
});
