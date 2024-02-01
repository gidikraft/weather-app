import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import WeatherDetails from '../components/layouts/WeatherDetails';
import { MarineWeather } from '../types/weather';
import { SERVER } from '../network';
import configDev from '../config/config.dev';
import { format } from 'date-fns';

const MarineTideWeather = () => {
  const [marineWeather, setMarineWeather] = useState<MarineWeather>();
  const [isLoading, setIsLoading] = useState(false);

  const getMarineWeather = async () => {
    try {
      setIsLoading(true);
      const currentmarineresponse = await SERVER.get(
        `marine.json?key=${configDev.API_KEY}&q=auto:ip&days=1`,
      );
      // console.log(currentmarineresponse.data, 'currentmarineresponse.data');

      if (currentmarineresponse.status === 200) {
        setMarineWeather(currentmarineresponse.data);
      }
    } catch (error) {
      console.log(error, 'current weather error response');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMarineWeather();
  }, []);

  return (
    <View style={styles.maincotainer}>
      <Text style={styles.header}>Marine Weather</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <View>
          <WeatherDetails
            details={`${marineWeather?.forecast.forecastday?.[0]?.date}`}
            label="Date: "
          />
          <WeatherDetails
            details={`${marineWeather?.forecast.forecastday?.[0].day?.condition?.text}`}
            label="Condition: "
          />
          {marineWeather?.forecast.forecastday?.[0]?.day?.tides?.[0]?.tide?.map(
            (item, index) => {
              const { tide_height_mt, tide_time, tide_type } = item;
              return (
                <View key={index.toString()}>
                  <WeatherDetails
                    details={format(tide_time, 'pp')}
                    label="Tide time: "
                  />
                  <WeatherDetails
                    details={tide_height_mt}
                    label="Tide height: "
                  />
                  <WeatherDetails details={tide_type} label="Tide type: " />
                </View>
              );
            },
          )}
        </View>
      )}
    </View>
  );
};

export default MarineTideWeather;

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
