import {StyleSheet, Text, View} from 'react-native';
import ImageCard from '../components/Imagecard';
import {MasonryFlashList} from '@shopify/flash-list';
import ImageBackgroundWrapper from '../components/Background';
import {wp} from '../constant/responsive';
import Colors from '../constant/Colors';

export default function DetailScreen({route}) {
  const {char} = route.params;
  function getEpisodeNumber(url) {
    const splitUrl = url.split('/');
    return splitUrl[splitUrl.length - 1];
  }

  function renderItem({item, index}) {
    const episodeNumber = getEpisodeNumber(item);
    return (
      <View style={styles.episodeCard} key={index}>
        <Text style={styles.episodeText}>Episode {episodeNumber}</Text>
      </View>
    );
  }

  return (
    <ImageBackgroundWrapper>
      <ImageCard imageurl={{uri: char.image}} title={char.name} />
      <Text style={styles.detailText}>Status: {char.status}</Text>
      <Text style={styles.detailText}>Species: {char.species}</Text>
      <Text style={styles.detailText}>Gender: {char.gender}</Text>
      <Text style={styles.detailText}>Origin: {char.origin.name}</Text>
      <Text style={styles.episodeHeader}>Episodes:</Text>
      <View style={{flex: 1, width: wp(100)}}>
        <MasonryFlashList
          data={char.episode}
          numColumns={3}
          renderItem={renderItem}
          estimatedItemSize={100}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ImageBackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  detailText: {
    fontSize: 16,
    color: Colors.white,
    marginVertical: 5,
  },
  episodeHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: Colors.green,
  },
  episodeCard: {
    backgroundColor: Colors.yellow,
    flex: 1,
    margin: 5,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.black,
  },
  episodeText: {
    fontSize: 16,
    color: Colors.black,
  },
});
