import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

type WeatherDetailsProps = {
  label: string;
  details?: string;
};

const WeatherDetails = ({ label, details }: WeatherDetailsProps) => {
  return (
    <View style={styles.detailContainer}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.details}>{details}</Text>
    </View>
  );
};

export default WeatherDetails;

const styles = StyleSheet.create({
  detailContainer: {
    marginTop: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  details: {
    fontSize: 14,
    color: '#000',
  },
});
