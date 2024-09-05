import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import fetchAllCharacters from '../services/ApiConfig';
import {MasonryFlashList} from '@shopify/flash-list';
import ImageCard from '../components/Imagecard';
import ImageBackgroundWrapper from '../components/Background';
import {wp} from '../constant/responsive';
import Colors from '../constant/Colors';
import FilterChips from '../components/Filterchip';

const ListScreen = ({navigation, route}) => {
  const initialStatus = route.params?.status || 'all';
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [filters, setFilters] = useState({
    status: initialStatus !== 'all' ? initialStatus : null,
    species: null,
    gender: null,
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadCharacters();
  }, []);

  useEffect(() => {
    setFilteredCharacters(
      characters.filter(
        char =>
          (!filters.status ||
            filters.status === 'all' ||
            char.status.toLowerCase() === filters.status.toLowerCase()) &&
          (!filters.species ||
            (filters.species.toLowerCase() === 'unknown'
              ? char.species.toLowerCase() !== 'human' &&
                char.species.toLowerCase() !== 'alien'
              : char.species.toLowerCase() ===
                filters.species.toLowerCase())) &&
          (!filters.gender ||
            char.gender.toLowerCase() === filters.gender.toLowerCase()),
      ),
    );
  }, [filters, characters]);

  const loadCharacters = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const data = await fetchAllCharacters(
        page,
        filters.status !== 'all' ? filters.status : null,
      );
      if (data.results) {
        setCharacters(prev => [...prev, ...data.results]);
        setHasMore(data.info.next !== null);
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      console.error('Error loading characters:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFilter = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type]?.toLowerCase() === value.toLowerCase() ? null : value,
    }));
    setPage(1);
    setCharacters([]);
    setHasMore(true);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.listCard}
      onPress={() => navigation.navigate('Detail', {char: item})}>
      <ImageCard
        imageurl={{uri: item.image}}
        title={item.name}
        species={item.species}
      />
    </TouchableOpacity>
  );

  return (
    <ImageBackgroundWrapper>
      <View style={styles.filterContainer}>
        {['status', 'species', 'gender'].map(type => (
          <FilterChips
            key={type}
            type={type}
            filters={filters}
            toggleFilter={toggleFilter}
          />
        ))}
      </View>
      <View style={{flex: 1, width: wp(100)}}>
        <MasonryFlashList
          data={filteredCharacters}
          numColumns={2}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          estimatedItemSize={300}
          showsVerticalScrollIndicator={false}
          onEndReached={loadCharacters}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading && <ActivityIndicator size="large" color={Colors.green} />
          }
        />
      </View>
    </ImageBackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    marginBottom: 10,
  },
  listCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 15,
    borderColor: Colors.yellow,
    borderWidth: 3,
    padding: 5,
  },
});

export default ListScreen;
