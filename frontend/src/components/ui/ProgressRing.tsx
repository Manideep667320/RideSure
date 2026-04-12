import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '../../theme/colors';

interface ProgressRingProps {
  progress: number;   // 0 to 1
  size?: number;
  strokeWidth?: number;
  children?: React.ReactNode;
}

/**
 * Policy Progress Ring per design system:
 * - Active path: secondary (#782ad9)
 * - Track: surfaceVariant (#e1e3e4)
 */
export const ProgressRing = ({
  progress,
  size = 160,
  strokeWidth = 10,
  children,
}: ProgressRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} style={styles.svg}>
        {/* Track */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.surfaceVariant}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Active path */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.secondary}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={styles.childrenContainer}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    position: 'absolute',
  },
  childrenContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
