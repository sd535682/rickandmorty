import {StyleSheet, Text, View} from 'react-native';
import ImageCard from '../components/Imagecard';
import {MasonryFlashList} from '@shopify/flash-list';

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
    <View style={styles.detailsScreen}>
      <ImageCard imageurl={{uri: char.image}} title={char.name} />
      <Text style={styles.detailText}>Status: {char.status}</Text>
      <Text style={styles.detailText}>Species: {char.species}</Text>
      <Text style={styles.detailText}>Gender: {char.gender}</Text>
      <Text style={styles.detailText}>Origin: {char.origin.name}</Text>
      <Text style={styles.episodeHeader}>Episodes:</Text>
      <MasonryFlashList
        data={char.episode}
        numColumns={2}
        renderItem={renderItem}
        estimatedItemSize={100}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  detailsScreen: {
    flex: 1,
    padding: 10,
    backgroundColor: 'black',
  },
  detailText: {
    fontSize: 16,
    color: 'white',
    marginVertical: 5,
  },
  episodeHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'white',
  },
  episodeCard: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    margin: 5,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  episodeText: {
    fontSize: 16,
    color: 'black',
  },
});
