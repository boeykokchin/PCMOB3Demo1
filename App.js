import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import BlockRGB from './components/BlockRGB';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

function HomeScreen() {
  const [colorArray, setColorArray] = React.useState([
    { red: 255, green: 0, blue: 0, id: '0' },
    { red: 0, green: 255, blue: 0, id: '1' },
    { red: 0, green: 0, blue: 255, id: '2' },
  ]);

  function renderItem({ item }) {
    return <BlockRGB red={item.red} green={item.green} blue={item.blue} />;
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

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} />
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
});
