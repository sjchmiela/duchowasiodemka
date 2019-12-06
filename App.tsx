import React from 'react';
import { AppLoading } from 'expo';
import { useScreens } from 'react-native-screens';
import * as Font from 'expo-font';
import MainNavigation from './src/navigation/MainNavigation';
import { Platform } from 'react-native';

if (Platform.OS !== "web") {
  useScreens(true);
}

export default function App() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  const startAsync = React.useCallback(() => Promise.all([
    Font.loadAsync('Inter', require('./assets/Inter-Regular.otf')),
    Font.loadAsync('Inter-Bold', require('./assets/Inter-Bold.otf')),
    Font.loadAsync('Inter-ExtraBold', require('./assets/Inter-ExtraBold.otf')),
  ]))

  if (!isLoaded) {
    return (
      <AppLoading
        startAsync={startAsync}
        onFinish={() => setIsLoaded(true)}
      />
    )
  }

  return (
    <MainNavigation />
  );
}
