import React, { useRef, useEffect } from 'react';
import { Text, View, Animated } from 'react-native';

export default function BlockRGB(props) {
  const ZoomInOutAnimate = (props) => {
    const scale = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.7,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start();
    }, [scale]);

    return (
      <Animated.View
        style={{
          ...props.style,
          transform: [{ scale: scale }],
        }}
      >
        {props.children}
      </Animated.View>
    );
  };

  return (
    <ZoomInOutAnimate>
      <View
        style={{
          backgroundColor: `rgb(${props.red}, ${props.green}, ${props.blue})`,
          margin: 0,
          padding: 40,
          width: '25%',
          borderStyle: 'solid',
          borderRadius: 100,
        }}
      ></View>
    </ZoomInOutAnimate>
  );
}
