import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import configDev from '../config/config.dev';
import { SERVER } from '../network';
import { MarineWeather } from '../types/weather';
import { Calendar } from 'react-native-calendars';

const FutureWeather = () => {
  const [futureWeather, setFutureWeather] = useState<MarineWeather>();
  const [selected, setSelected] = useState('');

  const getFutureWeather = async () => {
    try {
      const futureresponse = await SERVER.get(
        `future.json?key=${configDev.API_KEY}&q=auto:ip&dt=${selected}`,
      );
      console.log(futureresponse.data, 'future weather reponse');
      setFutureWeather(futureresponse.data);
    } catch (error) {
      console.log(error, 'future weather error response');
    }
  };

  useEffect(() => {
    getFutureWeather();
  }, [selected]);

  return (
    <View style={styles.maincotainer}>
      <Text style={styles.header}>Select a date to show weather</Text>

      <Calendar
        onDayPress={day => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: 'orange',
          },
        }}
      />
      <Text style={{ marginTop: 16, textAlign: 'center' }}>{selected}</Text>
    </View>
  );
};

export default FutureWeather;

const styles = StyleSheet.create({
  maincotainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 32,
    textAlign: 'center',
    marginTop: 32,
    color: '#000',
  },
});
