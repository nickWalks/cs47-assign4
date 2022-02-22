import { WebView } from 'react-native-webview';
import { StyleSheet, Text, SafeAreaView, Pressable, Image } from "react-native";
import Colors from "../Themes/colors";
import Images from "../Themes/images";

export default function SongDetails({ promptAsync, route }) {
    const external_url = route.params.external_url;
    {console.log(external_url)}
        {console.log("external_url")}
    return (
        
        <WebView source={{ uri: external_url }} />
     
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: Colors.background,
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    spotifyLogo: {
        flex: 2,
        height: '60%',
        width: '20%'
    },
    buttonPressable: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: Colors.spotify,
        height: 30,
        width: 250,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 99999
    },
    connectionText: {
        flex: 6,
        color: 'white',
        fontSize: 15
    }
});