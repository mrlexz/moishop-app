import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NotifierWrapper } from "react-native-notifier";

function makeClient() {
  const httpLink = new HttpLink({
    uri: process.env.EXPO_PUBLIC_GRAPHQL_ENDPOINT,
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = "";
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
  });

  const link = authLink.concat(httpLink);

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: typeof window === "undefined" ? ApolloLink.from([link]) : link,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ApolloProvider client={makeClient()}>
        <NotifierWrapper>{children}</NotifierWrapper>
      </ApolloProvider>
    </GestureHandlerRootView>
  );
}
