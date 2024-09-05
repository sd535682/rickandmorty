import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigation';
import BootSplash from 'react-native-bootsplash';

export default function App() {
  return (
    <NavigationContainer onReady={() => BootSplash.hide({fade: true})}>
      <StackNavigator />
    </NavigationContainer>
  );
}

// import React, {useState, useEffect} from 'react';
// import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import fetchAllCharacters from '../services/ApiConfig';
// import {MasonryFlashList} from '@shopify/flash-list';
// import ImageCard from '../components/Imagecard';
// import ImageBackgroundWrapper from '../components/Background';
// import {wp} from '../constant/responsive';
// import Colors from '../constant/Colors';

// const filtersData = {
//   status: ['Alive', 'Dead', 'Unknown'],
//   species: ['Human', 'Alien', 'Other'],
//   gender: ['Male', 'Female', 'Unknown'],
// };

// export default function ListScreen({navigation}) {
//   const [characters, setCharacters] = useState([]);
//   const [filteredCharacters, setFilteredCharacters] = useState([]);
//   const [filters, setFilters] = useState({
//     status: null,
//     species: null,
//     gender: null,
//   });

//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);

//   useEffect(() => {
//     (async () => {
//       const data = await fetchAllCharacters();
//       setCharacters(data);
//       setFilteredCharacters(data);
//     })();
//   }, []);

//   useEffect(() => {
//     setFilteredCharacters(
//       characters.filter(
//         char =>
//           (!filters.status || char.status === filters.status) &&
//           (!filters.species || char.species === filters.species) &&
//           (!filters.gender || char.gender === filters.gender),
//       ),
//     );
//   }, [filters, characters]);

//   const loadCharacters = async () => {
//     if (loading || !hasMore) return;
//     setLoading(true);

//     const data = await fetchAllCharacters(page);
//     if (data.results) {
//       setCharacters(prev => [...prev, ...data.results]); // Append new characters to the list
//       setHasMore(data.info.next !== null); // Check if more pages are available
//     }
//     setLoading(false);
//   };

//   const toggleFilter = (type, value) => {
//     setFilters(prev => ({
//       ...prev,
//       [type]: prev[type] === value ? null : value,
//     }));
//   };

//   const renderItem = ({item}) => (
//     <TouchableOpacity
//       style={styles.listCard}
//       onPress={() => navigation.navigate('Detail', {char: item})}>
//       <ImageCard
//         imageurl={{uri: item.image}}
//         title={item.name}
//         species={item.species}
//       />
//     </TouchableOpacity>
//   );

//   const renderChips = type => (
//     <View style={styles.filterRow}>
//       {filtersData[type].map(value => (
//         <TouchableOpacity
//           key={value}
//           style={[styles.chip, filters[type] === value && styles.selectedChip]}
//           onPress={() => toggleFilter(type, value)}>
//           <Text style={styles.chipText}>{value}</Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );

//   const loadMoreCharacters = () => {
//     if (hasMore && !loading) {
//       setPage(prevPage => prevPage + 1); // Increment the page number to load more data
//     }
//   };

//   return (
//     <ImageBackgroundWrapper>
//       <View style={styles.filterContainer}>
//         {['status', 'species', 'gender'].map(type => (
//           <View key={type}>
//             <Text style={styles.filterLabel}>
//               {type.charAt(0).toUpperCase() + type.slice(1)}:
//             </Text>
//             {renderChips(type)}
//           </View>
//         ))}
//       </View>
//       <View style={{flex: 1, width: wp(100)}}>
//         <MasonryFlashList
//           data={filteredCharacters}
//           numColumns={2}
//           keyExtractor={item => item.id.toString()}
//           renderItem={renderItem}
//           estimatedItemSize={300}
//           showsVerticalScrollIndicator={false}
//           onEndReached={loadMoreCharacters} // Trigger loading more data when user reaches the end
//           onEndReachedThreshold={0.5} // Trigger loadMoreCharacters when 50% of the list is visible
//           ListFooterComponent={
//             loading && <ActivityIndicator size="large" color="#00ff00" />
//           } // Show loading spinner at the bottom
//         />
//       </View>
//     </ImageBackgroundWrapper>
//   );
// }

// const styles = StyleSheet.create({
//   filterContainer: {
//     marginBottom: 10,
//   },
//   filterLabel: {
//     color: 'white',
//     fontSize: 16,
//     marginVertical: 5,
//   },
//   filterRow: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginBottom: 10,
//   },
//   chip: {
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     backgroundColor: Colors.black,
//     borderRadius: 20,
//     marginRight: 10,
//     marginBottom: 10,
//   },
//   selectedChip: {
//     backgroundColor: Colors.green,
//   },
//   chipText: {
//     color: Colors.white,
//     fontSize: 14,
//   },
//   listCard: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     margin: 10,
//     borderRadius: 15,
//     borderColor: Colors.yellow,
//     borderWidth: 3,
//     padding: 5,
//   },
// });
