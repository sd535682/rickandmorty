import {ImageBackground, StyleSheet} from 'react-native';
import {hp, wp} from '../constant/responsive';

export default function ImageBackgroundWrapper({children}) {
  return (
    <ImageBackground
      source={require('../assets/bg.jpg')}
      resizeMode="cover"
      style={styles.container}>
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black,
    width: wp(100),
    height: hp(100),
  },
});
