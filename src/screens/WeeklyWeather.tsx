import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SERVER } from '../network';
import configDev from '../config/config.dev';
import WeatherDetails from '../components/layouts/WeatherDetails';
import { format } from 'date-fns';
import { FutureWeatherResponse } from '../types/weather';

const WeeklyWeather = () => {
  const [weeklyWeather, setWeeklyWeather] = useState<FutureWeatherResponse>();
  const [isLoading, setIsLoading] = useState(false);

  const getFutureWeather = async () => {
    try {
      setIsLoading(true);
      const weeklyresponse = await SERVER.get(
        `forecast.json?key=${configDev.API_KEY}&q=auto:ip&days=1&aqi=no&alerts=no`,
      );
      // console.log(weeklyresponse.data, 'weekly weather reponse');
      setWeeklyWeather(weeklyresponse.data);
    } catch (error) {
      console.log(error, 'weekly weather response');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFutureWeather();
  }, []);

  return (
    <View style={styles.maincotainer}>
      <Text style={styles.header}>Hourly weather for today</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.slideContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <View>
            {weeklyWeather?.forecast?.forecastday?.[0]?.hour?.map(
              (item: any, index: number) => {
                // console.log(item);
                return (
                  <View key={index} style={styles.weatherDetails}>
                    <Text style={styles.selectedTime}>
                      {format(item?.time, 'pp')}
                    </Text>
                    <WeatherDetails
                      label="Condition: "
                      details={item?.condition?.text}
                    />
                    <WeatherDetails
                      label="Temperature"
                      details={`${item?.temp_c}°C`}
                    />
                    <WeatherDetails
                      label="Wind"
                      details={`${item?.wind_kph}kph`}
                    />

                    <Image
                      source={{
                        uri: `https:${item.condition?.icon}`,
                      }}
                      style={styles.conditionIcon}
                    />
                  </View>
                );
              },
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default WeeklyWeather;

const styles = StyleSheet.create({
  maincotainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginTop: 32,
    color: '#000',
  },
  selectedDate: {
    marginTop: 16,
    textAlign: 'center',
    color: '#000',
  },
  slideContainer: {
    paddingBottom: 30,
  },
  selectedTime: {
    textAlign: 'center',
    color: '#000',
  },
  conditionIcon: {
    height: 64,
    width: 64,
    alignSelf: 'center',
  },
  weatherDetails: {
    marginTop: 16,
  },
});
