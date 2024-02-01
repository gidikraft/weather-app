import {
  ActivityIndicator,
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

const WeeklyWeather = () => {
  const [weeklyWeather, setWeeklyWeather] = useState();
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
        contentContainerStyle={{ paddingBottom: 30 }}>
        {isLoading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <View>
            {weeklyWeather?.forecast?.forecastday?.[0]?.hour?.map(
              (item: any, index: number) => {
                // console.log(item);
                return (
                  <View key={index} style={{ marginTop: 16 }}>
                    <Text style={{ textAlign: 'center' }}>
                      {format(item?.time, 'pp')}
                    </Text>
                    {/* <WeatherDetails label="Time: " details={item?.time} /> */}
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
    fontSize: 32,
    textAlign: 'center',
    marginTop: 32,
    color: '#000',
  },
});
