import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import fetchAllCharacters from '../services/ApiConfig';
import {MasonryFlashList} from '@shopify/flash-list';
import ImageCard from '../components/Imagecard';

const filtersData = {
  status: ['Alive', 'Dead', 'Unknown'],
  species: ['Human', 'Alien', 'Other'],
  gender: ['Male', 'Female', 'Unknown'],
};

export default function ListScreen({navigation}) {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [filters, setFilters] = useState({
    status: null,
    species: null,
    gender: null,
  });

  useEffect(() => {
    (async () => {
      const data = await fetchAllCharacters();
      setCharacters(data);
      setFilteredCharacters(data);
    })();
  }, []);

  useEffect(() => {
    setFilteredCharacters(
      characters.filter(
        char =>
          (!filters.status || char.status === filters.status) &&
          (!filters.species || char.species === filters.species) &&
          (!filters.gender || char.gender === filters.gender),
      ),
    );
  }, [filters, characters]);

  const toggleFilter = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type] === value ? null : value,
    }));
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

  const renderChips = type => (
    <View style={styles.filterRow}>
      {filtersData[type].map(value => (
        <TouchableOpacity
          key={value}
          style={[styles.chip, filters[type] === value && styles.selectedChip]}
          onPress={() => toggleFilter(type, value)}>
          <Text style={styles.chipText}>{value}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        {['status', 'species', 'gender'].map(type => (
          <View key={type}>
            <Text style={styles.filterLabel}>
              {type.charAt(0).toUpperCase() + type.slice(1)}:
            </Text>
            {renderChips(type)}
          </View>
        ))}
      </View>
      <MasonryFlashList
        data={filteredCharacters}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        estimatedItemSize={300}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'black',
  },
  filterContainer: {
    marginBottom: 10,
  },
  filterLabel: {
    color: 'white',
    fontSize: 16,
    marginVertical: 5,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#666',
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedChip: {
    backgroundColor: '#fff',
  },
  chipText: {
    color: '#fff',
    fontSize: 14,
  },
  listCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkred',
    margin: 10,
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 3,
    padding: 5,
  },
});
