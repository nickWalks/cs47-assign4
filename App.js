import { StyleSheet, Text, SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { myTopTracks, albumTracks } from "./utils/apiOptions";
import { REDIRECT_URI, SCOPES, CLIENT_ID, ALBUM_ID } from "./utils/constants";
import Colors from "./Themes/colors"
import SpotifyAuthButton from "./components/SpotifyAuthButton";
import SongList from "./components/SongList";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SongDetails from './components/SongDetails';
import SongPreview from './components/SongPreview';

// Endpoints for authorizing with Spotify
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token"
};

export default function App() {
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: CLIENT_ID,
      scopes: SCOPES,
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: REDIRECT_URI
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      setToken(access_token);
    }
  }, [response]);

  useEffect(() => {
    const fetchTracks = async () => {
      // TODO: Comment out which one you don't want to use
      // myTopTracks or albumTracks

      //const res = await myTopTracks(token);
      const res = await albumTracks(ALBUM_ID, token);
      setTracks(res);
    };

    if (token) {
      // Authenticated, make API request
      fetchTracks();

    }
  }, [token]);

  let contentDisplayed = null;
  const Stack = createStackNavigator();

  if (token) {
    contentDisplayed = <Stack.Navigator initialRouteName="tracks">
    <Stack.Screen name="tracks" options={{headerShown: false}}>
      {props => <SongList {...props} tracks={tracks} />}
    </Stack.Screen>
    <Stack.Screen options={{
          title: 'Song details',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} name="Song details" component={SongDetails} />
    <Stack.Screen options={{
          title: 'Song details',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} name="Song preview" component={SongPreview} />
  </Stack.Navigator>
  } else {
   //   navigation.navigate("authPage", {promptAsync: promptAsync});
    contentDisplayed = <SpotifyAuthButton promptAsync={promptAsync} />
  }

  return (
    <NavigationContainer>
      {contentDisplayed}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  }
});
