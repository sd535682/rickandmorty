import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Colors from '../constant/Colors';

const filtersData = {
  status: ['Alive', 'Dead', 'unknown'],
  species: ['Human', 'Alien', 'unknown'],
  gender: ['Male', 'Female', 'Genderless', 'unknown'],
};

const FilterChips = ({type, filters, toggleFilter}) => (
  <View>
    <Text style={styles.filterLabel}>
      {type.charAt(0).toUpperCase() + type.slice(1)}:
    </Text>
    <View style={styles.filterRow}>
      {filtersData[type].map(value => (
        <TouchableOpacity
          key={value}
          style={[
            styles.chip,
            filters[type]?.toLowerCase() === value.toLowerCase() && styles.selectedChip,
          ]}
          onPress={() => toggleFilter(type, value)}>
          <Text style={styles.chipText}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  filterLabel: {
    color: Colors.white,
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
    backgroundColor: Colors.black,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedChip: {
    backgroundColor: Colors.green,
  },
  chipText: {
    color: Colors.white,
    fontSize: 14,
  },
});

export default FilterChips;