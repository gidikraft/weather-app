import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import configDev from '../config/config.dev';
import { SERVER } from '../network';
import { FutureWeatherResponse } from '../types/weather';
import { Calendar } from 'react-native-calendars';
import { format } from 'date-fns';
import WeatherDetails from '../components/layouts/WeatherDetails';

const FutureWeather = () => {
  const [futureWeather, setFutureWeather] =
    useState<FutureWeatherResponse | null>();
  const [selected, setSelected] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const dateError =
    'dt parameter should be in yyyy-MM-dd format and between 14 days and 300 days from today in the future.';

  const getFutureWeather = useCallback(async () => {
    try {
      setIsLoading(true);
      const url = `future.json?key=${configDev.API_KEY}&q=auto:ip&dt=${selected}`;
      const futureresponse = await SERVER.get(url);
      // console.log(futureresponse.data, 'future weather reponse');

      if (futureresponse.status === 200) {
        setFutureWeather(futureresponse.data);
        setErrorMessage('');
      }
    } catch (error: any) {
      console.log(
        error?.response?.data?.error?.message,
        'future weather error response',
      );
      if (
        error.response?.status === 400 &&
        error.response?.data?.error?.message === dateError
      ) {
        setErrorMessage(
          'date should be between 14 days and 300 days from today in the future.',
        );
        setFutureWeather(null);
      }
    } finally {
      setIsLoading(false);
    }
  }, [selected]);

  useEffect(() => {
    getFutureWeather();
  }, [getFutureWeather]);

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
            selectedColor: 'orange',
          },
        }}
      />
      <Text style={styles.selectedDate}>{selected}</Text>
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.slideContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <View>
            <WeatherDetails
              label="Average temp: "
              details={`${futureWeather?.forecast?.forecastday?.[0]?.day?.avgtemp_c}°C`}
            />
            <WeatherDetails
              label="Average condition: "
              details={
                futureWeather?.forecast?.forecastday?.[0]?.day?.condition?.text
              }
            />

            <Image
              source={{
                uri: `https:${futureWeather?.forecast?.forecastday?.[0]?.day?.condition?.icon}`,
              }}
              style={styles.conditionIcon}
            />

            {futureWeather?.forecast?.forecastday?.[0]?.hour?.map(
              (item: any, index: number) => {
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

export default FutureWeather;

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
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
    color: '#000',
  },
  errorMessage: {
    marginTop: 16,
    textAlign: 'center',
    color: 'red',
    fontSize: 12,
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
