import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SERVER } from '../network';
import configDev from '../config/config.dev';
import { CurrentWeather } from '../types/weather';
import WeatherDetails from '../components/layouts/WeatherDetails';

const HomeScreen = () => {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>();
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentWeather = async () => {
    try {
      setIsLoading(true);
      const currentweatherresponse = await SERVER.get(
        `current.json?key=${configDev.API_KEY}&q=auto:ip`,
      );
      // console.log(currentweatherresponse.data, 'currentweatherresponse.data');

      if (currentweatherresponse.status === 200) {
        setCurrentWeather(currentweatherresponse.data);
      }
    } catch (error) {
      console.log(error, 'current weather error response');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCurrentWeather();
  }, []);

  const time = currentWeather?.current?.last_updated.toString() as string;

  return (
    <View style={styles.maincotainer}>
      <Text style={styles.header}>Todays Weather</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <View>
          <Text style={styles.time}>{time}</Text>

          <View style={{ marginTop: 16 }}>
            <WeatherDetails
              details={currentWeather?.location?.name}
              label="Location: "
            />
            <WeatherDetails
              details={`${currentWeather?.current?.temp_c}°C`}
              label="Temperature: "
            />
            <WeatherDetails
              details={`${currentWeather?.current?.feelslike_c}°C`}
              label="Feels like: "
            />
            <WeatherDetails
              details={currentWeather?.current?.condition?.text}
              label="Condition: "
            />
            <WeatherDetails
              details={`${currentWeather?.current?.wind_kph}/kph`}
              label="Wind: "
            />
            <WeatherDetails
              details={`${currentWeather?.current?.humidity}`}
              label="humidity: "
            />
          </View>
        </View>
      )}

      {/* <Image
        source={{ uri: currentWeather?.current?.condition?.icon }}
        style={{ height: 64, width: 64 }}
      /> */}
      {/* <PrimaryButton label="Go to Future" onPress={toFuture} /> */}
    </View>
  );
};

export default HomeScreen;

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
  time: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 16,
    color: '#000',
  },
  detailContainer: {
    marginTop: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
  },
  details: {
    fontSize: 14,
    color: '#000',
  },
});
