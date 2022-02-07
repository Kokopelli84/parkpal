/* eslint-disable global-require */
// @ts-expect-error
import { STRIPE_KEY } from '@env';
import { useFonts } from 'expo-font';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApolloProvider } from '@apollo/client';
import Toast from 'react-native-toast-message';
import { Provider as StoreProvider } from 'react-redux';
import { StripeProvider } from '@stripe/stripe-react-native';
import apolloClient from './src/lib/apolloClient';
import theme from './src/styles/theme';
import { RootStackParams } from './types/rootStack';
import { WelcomeScreen, LoginScreen, RegisterScreen, HomeScreen } from './src/screens';
import { store } from './src/redux';

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
    <StripeProvider publishableKey={STRIPE_KEY}>
      <ApolloProvider client={apolloClient}>
        <StoreProvider store={store}>
          <PaperProvider theme={theme}>
            <NavigationContainer>
              <RootStack.Navigator
                screenOptions={{
                  headerShown: false,
                }}>
                <RootStack.Screen name="Welcome" component={WelcomeScreen} />
                <RootStack.Screen name="Login" component={LoginScreen} />
                <RootStack.Screen name="Register" component={RegisterScreen} />
                <RootStack.Screen name="Home" component={HomeScreen} />
              </RootStack.Navigator>
            </NavigationContainer>
            <Toast />
          </PaperProvider>
        </StoreProvider>
      </ApolloProvider>
    </StripeProvider>
  );
}
