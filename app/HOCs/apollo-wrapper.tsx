import { StorageKeys } from "@/constants/StorageKeys";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NotifierWrapper } from "react-native-notifier";
import { StripeProvider } from "@stripe/stripe-react-native";
import { Platform } from "react-native";

export function makeClient() {
  const httpLink = new HttpLink({
    uri: process.env.EXPO_PUBLIC_GRAPHQL_ENDPOINT,
  });

  const authLink = setContext(async (_, { headers }) => {
    try {
      // get the authentication token from local storage if it exists
      const token = await AsyncStorage.getItem(StorageKeys.TOKEN);
      // const parsedToken = token ? JSON.parse(token) : {};
      // const kindleUserId = localStorage.getItem(KINDE_USER_ID);

      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : undefined,
          // kinde_user_id: user?.id || kindleUserId,
        },
      };
    } catch (error) {}
  });

  const link = authLink.concat(httpLink);

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: typeof window === "undefined" ? ApolloLink.from([link]) : link,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  if (Platform.OS === "web") {
    return <>{children}</>;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ApolloProvider client={makeClient()}>
        {/* <StripeProvider
          publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
        > */}
        <BottomSheetModalProvider>
          <NotifierWrapper>{children}</NotifierWrapper>
        </BottomSheetModalProvider>
        {/* </StripeProvider> */}
      </ApolloProvider>
    </GestureHandlerRootView>
  );
}
