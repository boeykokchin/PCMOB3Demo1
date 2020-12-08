import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import BlockRGB from './components/BlockRGB';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

function HomeScreen({ navigation }) {
  const [colorArray, setColorArray] = React.useState([]);

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Color Details', { ...item })}
      >
        <BlockRGB red={item.red} green={item.green} blue={item.blue} />
      </TouchableOpacity>
    );
  }

  function addColor() {
    setColorArray([
      ...colorArray,
      {
        red: Math.floor(Math.random() * 256),
        green: Math.floor(Math.random() * 256),
        blue: Math.floor(Math.random() * 256),
        id: `${colorArray.length}`,
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ height: 40, justifyContent: 'center' }}
        onPress={addColor}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            marginBottom: 30,
            marginTop: 20,
          }}
        >
          &#x2295; Add Color &#x2295;
        </Text>
      </TouchableOpacity>
      <FlatList
        style={{ width: '100%' }}
        data={colorArray}
        renderItem={renderItem}
      />
    </View>
  );
}

function DetailsScreen({ route }) {
  const { red, green, blue } = route.params;

  return (
    <View style={{ padding: 50 }}>
      <Text style={[styles.colorDetails, { color: 'red' }]}>Red: {red}</Text>
      <Text style={[styles.colorDetails, { color: 'green' }]}>
        Green: {green}
      </Text>
      <Text style={[styles.colorDetails, { color: 'blue' }]}>Blue: {blue}</Text>
    </View>
  );
}
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Color List' component={HomeScreen} />
        <Stack.Screen name='Color Details' component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  colorDetails: {
    fontSize: 30,
  },
});
