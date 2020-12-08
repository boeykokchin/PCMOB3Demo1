import React from 'react';
import { Text, View } from 'react-native';

export default function BlockRGB(props) {
  return (
    <View
      style={{
        backgroundColor: `rgb(${props.red}, ${props.green}, ${props.blue})`,
        padding: 40,
        width: '20%',
        borderStyle: 'solid',
        borderRadius: 100,
      }}
    ></View>
  );
}
