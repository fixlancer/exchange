import React from 'react';
import { View, Text } from 'react-native';
import { Svg, Circle } from 'react-native-svg';

const CircularProgress = ({ size, strokeWidth, progress }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress / 100 * circumference;

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background Circle */}
        <Circle
          stroke="#ebebeb"
          fill="white"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Foreground Circle */}
        <Circle
          stroke="#1cc88a"
          fill="none"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
        />
      </Svg>
      <View style={{
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text>{`${progress.toFixed(0)}%`}</Text>
      </View>
    </View>
  );
};
export default CircularProgress;