/* eslint-disable global-require */
import { useFonts } from 'expo-font';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import theme from './src/styles/theme';
import { RootStackParams } from './types/rootStack';

import { WelcomeScreen, LoginScreen } from './src/screens';

export default function App() {
  const RootStack = createNativeStackNavigator<RootStackParams>();
  const [loaded] = useFonts({
    InterRegular: require('./assets/fonts/Inter-Regular.ttf'),
    InterMedium: require('./assets/fonts/Inter-Medium.ttf'),
    InterLight: require('./assets/fonts/Inter-Light.ttf'),
    InterThin: require('./assets/fonts/Inter-Thin.ttf'),
  });

  if (!loaded) return null;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <RootStack.Screen name="Welcome" component={WelcomeScreen} />
          <RootStack.Screen name="Sign In Page" component={LoginScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
