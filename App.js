import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import BlockRGB from './components/BlockRGB';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';

function HomeScreen({ navigation }) {
  const [colorArray, setColorArray] = React.useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={addColor} title='+' />,
      headerLeft: () => <Button onPress={resetColor} title='R' />,
    });
  });

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Color Dot Details', { ...item })}
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

  function resetColor() {
    setColorArray([]);
  }

  return (
    <View style={styles.container}>
      {
        //   <TouchableOpacity
        //   style={{ height: 40, justifyContent: 'center' }}
        //   onPress={addColor}
        // >
        //   <Text
        //     style={{
        //       color: 'white',
        //       fontSize: 20,
        //       marginBottom: 30,
        //       marginTop: 20,
        //     }}
        //   >
        //     ADD
        //   </Text>
        // </TouchableOpacity>
        // <TouchableOpacity
        //   style={{ height: 40, justifyContent: 'center' }}
        //   onPress={resetColor}
        // >
        //   <Text
        //     style={{
        //       color: 'red',
        //       fontSize: 20,
        //       marginBottom: 30,
        //       marginTop: 20,
        //     }}
        //   >
        //     RESET
        //   </Text>
        // </TouchableOpacity>
      }
      <FlatList
        contentContainerStyle={{ justifyContent: 'center' }}
        // style={{ width: '100%' }}
        data={colorArray}
        renderItem={renderItem}
      />
    </View>
  );
}

function DetailsScreen({ route }) {
  const { red, green, blue } = route.params;

  let yiq = (red * 299 + green * 587 + blue * 114) / 1000;
  let textColor = yiq >= 128 ? 'black' : 'white';

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 50,
        backgroundColor: `rgb(${red}, ${green}, ${blue})`,
      }}
    >
      <Text style={{ color: `${textColor}` }}>YIQ: {yiq}</Text>
      <Text style={[styles.colorDetails, { color: `${textColor}` }]}>
        Red: {red}
      </Text>
      <Text style={[styles.colorDetails, { color: `${textColor}` }]}>
        Green: {green}
      </Text>
      <Text style={[styles.colorDetails, { color: `${textColor}` }]}>
        Blue: {blue}
      </Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTintColor: 'orange' }}>
        <Stack.Screen name='Color Dots' component={HomeScreen} />
        <Stack.Screen name='Color Dot Details' component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  colorDetails: {
    fontSize: 30,
  },
});
